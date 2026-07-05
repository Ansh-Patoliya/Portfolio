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
			"An interactive and dynamic **Power BI Dashboard** that provides comprehensive insights into Indian Premier League (IPL) matches, team performances, and player statistics across multiple seasons.\n\n" +
			"This dashboard is designed to analyze IPL historical data to help cricket enthusiasts, analysts, and franchise managers gain deep insights into match trends, player profiles, and team statistics.\n\n" +
			"The dashboard leverages **Power Query** for data transformation, **DAX (Data Analysis Expressions)** for advanced calculations/measures, and modern **Power BI visuals** for interactive storytelling.",
		image:
			"https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1400&q=80",
		tags: ["Power BI", "Data Analytics", "EDA", "SQL"],
		githubUrl: "https://github.com/Ansh-Patoliya/IPL-Dashboard",
	},
	{
		title: "Stock Market Analytics Dashboard",
		createdAt: "2026-06-15",
		priority: 16,
		description:
			"The **Stock Market Analytics Dashboard** is a comprehensive, interactive Power BI suite designed to analyze stock market behavior. Utilizing **5-minute OHLCV (Open, High, Low, Close, Volume)** historical data, it computes and visualizes trend metrics, momentum indicators, volatility indices, and key candlestick statistical behaviors to empower traders and analysts with actionable market insights.\n\n" +
			"Key Objectives:\n" +
			"* **Price Analysis**: Track intraday trend cycles and micro-movements.\n" +
			"* **Trend Detection**: Highlight market directions using multi-interval Moving Averages and Cross-over markers.\n" +
			"* **Momentum Monitoring**: Gauge oversold and overbought conditions.\n" +
			"* **Volatility Analysis**: Quantify risk parameters using price deviations.\n" +
			"* **Candlestick Statistics**: Measure structural candle configurations (wicks, body proportions).\n" +
			"* **Interactive Design**: Deliver a modern dashboard optimized for performance.",
		image:
			"https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1400&q=80",
		tags: ["Power BI", "Python", "Data Analytics", "Finance", "SQL"],
		githubUrl: "https://github.com/Ansh-Patoliya/Stock-Market-Analytics-Dashboard",
	},
];

type Project = (typeof projects)[number];

/* Helper to parse bold markdown tags (**text**) into <strong> components */
function formatBoldText(text: string) {
	const parts = text.split(/\*\*([^*]+)\*\*/g);
	return parts.map((part, i) => {
		if (i % 2 === 1) {
			return <strong key={i} className="font-semibold text-[#FAFAFA]">{part}</strong>;
		}
		return part;
	});
}

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
				className="relative w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col border border-[#262626] live-blue-glow"
				style={{ maxHeight: "85vh", backgroundColor: "#111111" }}
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
					className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/80 transition-all duration-200 cursor-pointer"
					aria-label="Close modal"
				>
					<X className="w-5 h-5" />
				</button>

				{/* Scrollable Container */}
				<div className="w-full overflow-y-auto flex-grow rounded-2xl">
					{/* Image Header */}
					<div className="relative shrink-0 w-full overflow-hidden">
						<img
							src={project.image}
							alt={project.title}
							className="w-full h-48 sm:h-64 object-cover"
							loading="lazy"
						/>
						<div className="absolute inset-0 bg-[#111111]/40" />
					</div>

					{/* Content Body */}
					<div className="px-6 pt-6 pb-6 sm:px-8 sm:pt-8 sm:pb-8 relative z-10">
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
							<div className="text-[#FAFAFA]/80 leading-relaxed text-base space-y-3">
								{project.description.split("\n").map((line, idx) => {
									const trimmed = line.trim();
									if (trimmed.startsWith("*") || trimmed.startsWith("-")) {
										return (
											<div key={idx} className="flex items-start gap-2 pl-4">
												<span className="text-[#2563EB] mt-1.5">•</span>
												<span>{formatBoldText(trimmed.substring(1).trim())}</span>
											</div>
										);
									}
									if (trimmed === "") {
										return <div key={idx} className="h-2" />;
									}
									return (
										<p key={idx}>
											{formatBoldText(trimmed)}
										</p>
									);
								})}
							</div>
						</div>

						{/* Divider before buttons */}
						<div className="w-full h-px bg-[#262626] mb-6" />

						{/* Action buttons */}
						<div className="flex flex-col sm:flex-row gap-3">
							<Button
								className="modal-btn-primary flex-grow cursor-pointer"
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
								className="modal-btn-secondary cursor-pointer"
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
						{/* Spacer to prevent browser scroll padding cutoffs */}
						<div className="h-6" />
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
			className="group relative live-blue-glow-card overflow-hidden h-full flex flex-col cursor-pointer rounded-2xl"
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