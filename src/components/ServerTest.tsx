import { useState } from "react";
import { Button } from "./ui/button";
import { projectId, publicAnonKey } from "../utils/supabase/info";

export function ServerTest() {
  const [testResult, setTestResult] = useState<string>("");
  const [testing, setTesting] = useState(false);

  const testServer = async () => {
    setTesting(true);
    setTestResult("");

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ebb6b21e/health`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setTestResult(`✅ Server is healthy: ${JSON.stringify(result)}`);
      } else {
        setTestResult(`❌ Server error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      setTestResult(`❌ Network error: ${error.message}`);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-card border border-border rounded-lg p-4 shadow-lg max-w-sm">
      <h3 className="text-sm font-medium mb-2">Server Test</h3>
      <Button 
        onClick={testServer} 
        disabled={testing}
        size="sm"
        className="mb-2"
      >
        {testing ? "Testing..." : "Test Server"}
      </Button>
      {testResult && (
        <div className="text-xs text-muted-foreground break-words">
          {testResult}
        </div>
      )}
    </div>
  );
}