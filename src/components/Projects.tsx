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
				className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col border border-[#262626] bg-[#111111]"
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
					<div className="absolute inset-0 bg-[#111111]/50" />
				</div>

				{/* Content Body */}
				<div className="px-6 pb-6 sm:px-8 sm:pb-8 -mt-6 sm:-mt-10 relative flex-grow flex flex-col z-10">
					{/* Title */}
					<h3 className="text-2xl sm:text-3xl font-bold mb-4 text-[#FAFAFA]">
						{project.title}
					</h3>

					{/* Tech stack */}
					<div className="flex flex-wrap gap-2 mb-6">
						{project.tags.map((tag) => (
							<Badge
								key={tag}
								variant="secondary"
								className="bg-[#161616] text-[#2563EB] border border-[#262626] px-3 py-1 text-sm rounded-md"
							>
								{tag}
							</Badge>
						))}
					</div>

					{/* Divider */}
					<div className="w-full h-px bg-[#262626] mb-6" />

					{/* Description */}
					<div className="mb-8">
						<h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
							About this project
						</h4>
						<p className="text-[#FAFAFA]/80 leading-relaxed text-base">
							{project.description}
						</p>
					</div>

					<div className="mt-auto pt-2" />

					{/* Action buttons */}
					<div className="flex flex-col sm:flex-row gap-3">
						<Button
							className="flex-1 bg-[#2563EB] hover:bg-gradient-to-r hover:from-[#2563EB] hover:to-[#3b82f6] text-[#FAFAFA] hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] px-8 py-6 rounded-full transition-all duration-300 text-base border-0"
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
							className="border-[#262626] hover:border-[#2563EB] hover:bg-[#2563EB]/10 text-[#FAFAFA] rounded-full py-6 px-6 transition-all duration-300"
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
			className="group relative bg-[#111111] border border-[#262626] hover:border-[#3b82f6]/40 hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden h-full flex flex-col cursor-pointer shadow-lg hover:shadow-2xl"
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
					className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
					loading="lazy"
				/>

				{/* "More info" hint on hover */}
				<div
					className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
					style={{ pointerEvents: "none" }}
				>
					<div className="flex items-center gap-1.5 bg-[#0A0A0A]/90 backdrop-blur-sm text-[#FAFAFA] text-xs font-medium px-3 py-1.5 rounded-full border border-[#262626]">
						<Info className="w-3 h-3 text-[#2563EB]" />
						Click for details
					</div>
				</div>
			</div>

			{/* Card body */}
			<div className="p-5 flex flex-col flex-grow">
				{/* Title */}
				<h3 className="text-lg font-semibold mb-3 text-[#FAFAFA] group-hover:text-[#2563EB] transition-colors duration-300 line-clamp-1">
					{project.title}
				</h3>

				{/* Tech stack */}
				<div className="flex flex-wrap gap-1.5 mb-5">
					{project.tags.map((tag) => (
						<Badge
							key={tag}
							variant="secondary"
							className="bg-[#161616] text-[#A1A1AA] border border-[#262626] group-hover:border-[#A1A1AA]/30 transition-colors duration-300 text-xs px-2.5 py-0.5 rounded-md"
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
					className="w-full bg-[#2563EB] hover:bg-gradient-to-r hover:from-[#2563EB] hover:to-[#3b82f6] text-[#FAFAFA] hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all duration-300 rounded-lg border-0"
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
		<section id="projects" className="py-20 bg-[#0D0D0D]">
			<div className="container px-6 max-w-6xl mx-auto">
				<ScrollReveal className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl mb-4 text-[#FAFAFA] font-semibold tracking-tight">
						Featured Projects
					</h2>
					<div className="w-24 h-1 bg-[#2563EB] mx-auto rounded-full" />
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