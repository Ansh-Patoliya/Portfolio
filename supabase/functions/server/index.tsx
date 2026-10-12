import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'jsr:@supabase/supabase-js@2'
import * as kv from './kv_store.tsx'

const app = new Hono()

app.use('*', logger(console.log))
app.use('*', cors({
  origin: ['*'],
  allowHeaders: ['*'],
  allowMethods: ['*'],
  exposeHeaders: ['*'],
  maxAge: 600,
  credentials: true,
}))

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

// Submit contact form
app.post('/make-server-ebb6b21e/contact', async (c) => {
  try {
    const { name, email, message } = await c.req.json()

    if (!name || !email || !message) {
      return c.json({ error: 'Name, email, and message are required' }, 400)
    }

    // Store contact submission
    const submissionId = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const contactData = {
      id: submissionId,
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
      status: 'new'
    }

    await kv.set(submissionId, contactData)
    
    console.log(`Contact form submission from ${name} (${email}) stored with ID: ${submissionId}`)

    return c.json({ 
      success: true, 
      message: 'Thank you for your message! I\'ll get back to you soon.',
      submissionId 
    })

  } catch (error) {
    console.log(`Error processing contact form submission: ${error}`)
    return c.json({ error: 'Failed to submit contact form' }, 500)
  }
})

// Get all contact submissions (for admin purposes)
app.get('/make-server-ebb6b21e/admin/contacts', async (c) => {
  try {
    const contacts = await kv.getByPrefix('contact_')
    
    // Sort by timestamp (newest first)
    const sortedContacts = contacts.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )

    return c.json({ contacts: sortedContacts })

  } catch (error) {
    console.log(`Error fetching contact submissions: ${error}`)
    return c.json({ error: 'Failed to fetch contact submissions' }, 500)
  }
})

// Mark contact as read
app.patch('/make-server-ebb6b21e/admin/contacts/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const { status } = await c.req.json()

    const existingContact = await kv.get(id)
    if (!existingContact) {
      return c.json({ error: 'Contact submission not found' }, 404)
    }

    const updatedContact = {
      ...existingContact,
      status,
      updatedAt: new Date().toISOString()
    }

    await kv.set(id, updatedContact)

    return c.json({ success: true, contact: updatedContact })

  } catch (error) {
    console.log(`Error updating contact status: ${error}`)
    return c.json({ error: 'Failed to update contact status' }, 500)
  }
})

// Health check
app.get('/make-server-ebb6b21e/health', (c) => {
  return c.json({ status: 'healthy', timestamp: new Date().toISOString() })
})

Deno.serve(app.fetch)