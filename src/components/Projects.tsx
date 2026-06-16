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
		title: "IPL Analytics Dashboard",
		createdAt: "2026-06-01",
		priority: 15,
		description:
			"An interactive Power BI dashboard analyzing IPL player and team performances using historical tournament data. Features include Most Runs Scored (top batsmen analysis), Most Wickets Taken (top bowlers analysis), player performance comparison, team-wise statistics, match results analysis, and interactive filters with KPI cards for dynamic data exploration.",
		image:
			"https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1400&q=80",
		tags: ["Power BI", "Data Analytics", "EDA", "SQL"],
		githubUrl: "https://github.com/Ansh-Patoliya",
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