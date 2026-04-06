import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ExternalLink, Github, X, Info } from "lucide-react";
import { ScrollReveal } from "./effects/ScrollReveal";

/* ------------------------------------------------------------------ */
/*  Project data                                                       */
/* ------------------------------------------------------------------ */
const projects = [
	{
		title: "CampusConnect",
		createdAt: "2025-09-01",
		description:
			"CampusConnect is a modern, feature-rich campus event management system designed to streamline the organization and participation of campus activities. Built with JavaFX and PostgreSQL, it provides a robust platform for students, club members, and administrators to collaborate effectively.",
		image:
			"https://images.unsplash.com/photo-1675095904077-600d903942da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwbWFuYWdlbWVudCUyMHBsYXRmb3JtfGVufDF8fHx8MTc1NzMxNjQyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
		tags: ["Java", "JavaFX", "PostgreSQL"],
		githubUrl: "https://github.com/Ansh-Patoliya/CampusConnect",
	},
	{
		title: "Stock Market Simulator",
		createdAt: "2025-07-01",
		description:
			"A real-time stock trading simulator built with Java and JavaFX. It allows users to register, log in, add wallet balance, and simulate buying/selling of stocks with dynamic price updates using multithreading.",
		image: "https://cdn.pixabay.com/photo/2021/08/08/15/06/stock-market-6531146_1280.jpg",
		tags: ["Java", "JavaFX", "MySQL"],
		githubUrl: "https://github.com/Ansh-Patoliya/Stock-Market-Simulator",
	},
	{
		title: "Employee Management System",
		createdAt: "2025-05-01",
		description:
			"The Employee Management System is a Java-based application designed to manage employee details, salaries, leave requests, and approvals efficiently. It includes role-based access for employees and managers, providing features such as profile management, salary details, leave applications, and manager approvals.",
		image:
			"https://www.sourcecodester.com/sites/default/files/images/oretnom23/employee-management-system-home-page.png",
		tags: ["Java"],
		githubUrl: "https://github.com/Ansh-Patoliya/Sem-1-Project-EmpoyeeManagement",
	},
	{
		title: "Online Banking System",
		createdAt: "2025-03-01",
		description:
			"The Online Banking System is a Java-based application that provides users with various banking services, including account management, loan management, fixed deposits, and transaction history. It enables users to register, log in, add wallet balance, and perform banking operations efficiently.",
		image:
			"https://as1.ftcdn.net/v2/jpg/04/87/53/72/1000_F_487537248_CR9mdE7w7aToWazXOYzbA0aRhqKi8Xp7.jpg",
		tags: ["Java"],
		githubUrl: "https://github.com/Ansh-Patoliya/sem-1-project-OnlineBankingSystem",
	},
	{
		title: "Stocxsim",
		createdAt: "2026-04-06",
		priority: 10,
		description:
			"A full-stack paper trading simulator to practice stock trading with virtual money using live market data, real-time dashboards, and portfolio tracking.",
		image: "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=1400&q=80",
		tags: ["Python", "Flask", "PostgreSQL", "Socket.IO"],
		githubUrl: "https://github.com/Stocxsim/stocxsim",
	},
	{
		title: "HackHub",
		createdAt: "2026-04-06",
		priority: 9,
		description:
			"A hackathon/team hub web app for managing teams, submissions, and QR-based flows—built with Flask and a relational database.",
		image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80",
		tags: ["Python", "Flask", "HTML/CSS", "JavaScript"],
		githubUrl: "https://github.com/Tech-Wizards-1331/HackHub",
	},
];

type Project = (typeof projects)[number];

/* ------------------------------------------------------------------ */
/*  Project Detail Modal                                               */
/* ------------------------------------------------------------------ */
function ProjectModal({
	project,
	onClose,
}: {
	project: Project;
	onClose: () => void;
}) {
	// Close on Escape key
	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		},
		[onClose],
	);

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);
		document.body.style.overflow = "hidden";

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "";
		};
	}, [handleKeyDown]);

	if (typeof document === "undefined") return null;

	return createPortal(
		<motion.div
			className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
		>
			{/* Backdrop – blur the page behind the modal */}
			<motion.div
				className="absolute inset-0 bg-black/45 backdrop-blur-lg"
				onClick={onClose}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.3 }}
			/>

			{/* Modal content */}
			<motion.div
				className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col border border-border/60 bg-card"
				initial={{ scale: 0.95, opacity: 0, y: 20 }}
				animate={{ scale: 1, opacity: 1, y: 0 }}
				exit={{ scale: 0.95, opacity: 0, y: 20 }}
				transition={{ type: "spring", damping: 25, stiffness: 300 }}
				role="dialog"
				aria-modal="true"
				aria-label={`${project.title} details`}
			>
				{/* Close button */}
				<button
					onClick={onClose}
					className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/60 transition-all duration-200 cursor-pointer"
					aria-label="Close modal"
				>
					<X className="w-5 h-5" />
				</button>

				{/* Image Header */}
				<div className="relative shrink-0 w-full overflow-hidden">
					<img
						src={project.image}
						alt={project.title}
						className="w-full h-48 sm:h-64 object-cover"
						loading="lazy"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/35 to-transparent opacity-90" />
				</div>

				{/* Content Body */}
				<div className="px-6 pb-6 sm:px-8 sm:pb-8 -mt-6 sm:-mt-10 relative flex-grow flex flex-col z-10">
					{/* Title */}
					<h3 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-foreground to-chart-1 bg-clip-text text-transparent">
						{project.title}
					</h3>

					{/* Tech stack */}
					<div className="flex flex-wrap gap-2 mb-6">
						{project.tags.map((tag) => (
							<Badge
								key={tag}
								variant="secondary"
								className="bg-chart-1/10 text-chart-1 border border-chart-1/20 px-3 py-1 text-sm rounded-md"
							>
								{tag}
							</Badge>
						))}
					</div>

					{/* Divider */}
					<div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6" />

					{/* Description */}
					<div className="mb-8">
						<h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
							About this project
						</h4>
						<p className="text-foreground/80 leading-relaxed text-base">
							{project.description}
						</p>
					</div>

					<div className="mt-auto pt-2" />

					{/* Action buttons */}
					<div className="flex flex-col sm:flex-row gap-3">
						<Button
							className="flex-1 bg-gradient-to-r from-chart-1 to-chart-2 hover:from-chart-2 hover:to-chart-1 text-white border-0 rounded-xl py-6 shadow-lg hover:shadow-xl transition-all duration-300 text-base"
							asChild
						>
							<a
								href={project.githubUrl}
								target="_blank"
								rel="noopener noreferrer"
							>
								<ExternalLink className="w-5 h-5 mr-2" />
								View Project
							</a>
						</Button>
						<Button
							variant="outline"
							className="border-border hover:border-chart-1 hover:bg-chart-1/10 text-foreground rounded-xl py-6 px-6 transition-all duration-300"
							asChild
						>
							<a
								href={project.githubUrl}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`View ${project.title} on GitHub`}
							>
								<Github className="w-5 h-5" />
							</a>
						</Button>
					</div>
				</div>

				{/* Bottom gradient accent line */}
				<div className="h-1 w-full shrink-0 bg-gradient-to-r from-chart-1 to-chart-2" />
			</motion.div>
		</motion.div>,
		document.body
	);
}

/* ------------------------------------------------------------------ */
/*  Project Card (simplified – no description)                         */
/* ------------------------------------------------------------------ */
function ProjectCard({
	project,
	onSelect,
}: {
	project: Project;
	onSelect: () => void;
}) {
	return (
		<div
			className="group neon-border relative bg-card/50 backdrop-blur border border-border/50 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-chart-1/10 hover:-translate-y-1.5 h-full flex flex-col cursor-pointer"
			onClick={onSelect}
			role="button"
			tabIndex={0}
			aria-label={`View details for ${project.title}`}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					onSelect();
				}
			}}
			style={{ position: "relative", zIndex: 2 }}
		>
			{/* Image */}
			<div className="relative overflow-hidden">
				<img
					src={project.image}
					alt={project.title}
					className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
					loading="lazy"
				/>
				<div
					className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
					style={{ pointerEvents: "none" }}
				/>

				{/* "More info" hint on hover */}
				<div
					className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
					style={{ pointerEvents: "none" }}
				>
					<div className="flex items-center gap-1.5 bg-background/90 backdrop-blur-sm text-foreground text-xs font-medium px-3 py-1.5 rounded-full border border-border/50">
						<Info className="w-3 h-3" />
						Click for details
					</div>
				</div>
			</div>

			{/* Card body */}
			<div className="p-5 flex flex-col flex-grow">
				{/* Title */}
				<h3 className="text-lg font-semibold mb-3 group-hover:text-chart-1 transition-colors duration-300 line-clamp-1">
					{project.title}
				</h3>

				{/* Tech stack */}
				<div className="flex flex-wrap gap-1.5 mb-5">
					{project.tags.map((tag) => (
						<Badge
							key={tag}
							variant="secondary"
							className="bg-accent/50 text-accent-foreground group-hover:bg-chart-1/15 group-hover:text-chart-1 transition-colors duration-300 text-xs px-2.5 py-0.5"
						>
							{tag}
						</Badge>
					))}
				</div>

				{/* Spacer */}
				<div className="flex-grow" />

				{/* View Project button */}
				<Button
					size="sm"
					className="w-full bg-gradient-to-r from-chart-1 to-chart-2 hover:from-chart-2 hover:to-chart-1 text-white border-0 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
					asChild
				>
					<a
						href={project.githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						onClick={(e) => e.stopPropagation()}
						style={{ position: "relative", zIndex: 5, pointerEvents: "auto" }}
					>
						<ExternalLink className="w-4 h-4 mr-2" />
						View Project
					</a>
				</Button>
			</div>

			{/* Bottom accent line */}
			<div
				className="h-0.5 bg-gradient-to-r from-chart-1 to-chart-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
				style={{ pointerEvents: "none" }}
			/>
		</div>
	);
}

/* ------------------------------------------------------------------ */
/*  Projects Section                                                   */
/* ------------------------------------------------------------------ */
export function Projects() {
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const orderedProjects = [...projects].sort((a, b) => {
		// Higher priority first (optional)
		const priorityDiff = (b.priority ?? 0) - (a.priority ?? 0);
		if (priorityDiff !== 0) return priorityDiff;

		// Newest first
		return new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime();
	});

	return (
		<section id="projects" className="py-20 bg-gradient-to-b from-accent/5 to-background">
			<div className="container px-6 max-w-6xl mx-auto">
				<ScrollReveal className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-foreground to-chart-1 bg-clip-text text-transparent">
						Featured Projects
					</h2>
					<div className="w-24 h-1 bg-gradient-to-r from-chart-1 to-chart-2 mx-auto rounded-full" />
					<p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
						Here are some of my recent projects that showcase my skills and passion for creating innovative
						solutions.
					</p>
				</ScrollReveal>

				<div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
					{orderedProjects.map((project, index) => (
						<ScrollReveal
							key={project.title}
							delay={index * 0.06}
							className="h-full"
						>
							<ProjectCard
								project={project}
								onSelect={() => setSelectedProject(project)}
							/>
						</ScrollReveal>
					))}
				</div>
			</div>

			{/* Modal */}
			<AnimatePresence>
				{selectedProject && (
					<ProjectModal
						project={selectedProject}
						onClose={() => setSelectedProject(null)}
					/>
				)}
			</AnimatePresence>
		</section>
	);
}