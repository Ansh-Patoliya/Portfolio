import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Github, X, ArrowUpRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Project data (verbatim)                                           */
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
			return (
				<strong key={i} className="font-semibold text-[#F4EFE4]">
					{part}
				</strong>
			);
		}
		return part;
	});
}

/* ------------------------------------------------------------------ */
/*  Editorial Project Detail Modal                                    */
/* ------------------------------------------------------------------ */
function ProjectModal({
	project,
	onClose,
}: {
	project: Project;
	onClose: () => void;
}) {
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
			transition={{ duration: 0.2 }}
		>
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-[#14130F]/70 backdrop-blur-sm"
				onClick={onClose}
			/>

			{/* Modal container */}
			<motion.div
				className="relative w-full max-w-3xl rounded-[24px] shadow-2xl flex flex-col border border-[#D9D2C0]/20 bg-[#14130F] text-[#F4EFE4] overflow-hidden z-10"
				style={{ maxHeight: "88vh" }}
				initial={{ scale: 0.96, opacity: 0, y: 16 }}
				animate={{ scale: 1, opacity: 1, y: 0 }}
				exit={{ scale: 0.96, opacity: 0, y: 16 }}
				transition={{ duration: 0.25, ease: "easeOut" }}
				role="dialog"
				aria-modal="true"
				aria-label={`${project.title} details`}
			>
				{/* Close button */}
				<button
					type="button"
					onClick={onClose}
					className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-[#14130F]/80 border border-[#D9D2C0]/30 flex items-center justify-center text-[#F4EFE4]/80 hover:text-[#F4EFE4] hover:bg-[#14130F] transition-colors cursor-pointer"
					aria-label="Close modal"
				>
					<X className="w-4 h-4" />
				</button>

				{/* Scrollable Container */}
				<div className="w-full overflow-y-auto">
					<div className="relative shrink-0 w-full h-56 sm:h-72 overflow-hidden border-b border-[#D9D2C0]/15">
						<img
							src={project.image}
							alt={project.title}
							className="w-full h-full object-cover opacity-85"
							loading="lazy"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-[#14130F] via-transparent to-transparent" />
					</div>

					<div className="p-6 sm:p-10 space-y-6">
						<div>
							<span className="font-mono text-xs uppercase tracking-[0.1em] text-[#1F5C45] block mb-2">
								PROJECT DETAILS
							</span>
							<h3 className="font-serif text-3xl sm:text-4xl text-[#F4EFE4] leading-tight">
								{project.title}
							</h3>
						</div>

						<div className="flex flex-wrap gap-2">
							{project.tags.map((tag) => (
								<span
									key={tag}
									className="font-mono text-xs uppercase tracking-[0.08em] px-3 py-1 rounded-full border border-[#D9D2C0]/25 text-[#D9D2C0]"
								>
									{tag}
								</span>
							))}
						</div>

						<div className="w-full h-px bg-[#D9D2C0]/20" />

						<div className="space-y-4 font-sans text-base text-[#D9D2C0]/90 leading-relaxed">
							<h4 className="font-mono text-xs uppercase tracking-[0.1em] text-[#6B665A]">
								About this project
							</h4>
							<div className="space-y-3">
								{project.description.split("\n").map((line, idx) => {
									const trimmed = line.trim();
									if (trimmed.startsWith("*") || trimmed.startsWith("-")) {
										return (
											<div key={idx} className="flex items-start gap-2.5 pl-2">
												<span className="text-[#1F5C45] font-serif text-lg leading-none mt-1">•</span>
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

						<div className="w-full h-px bg-[#D9D2C0]/20 pt-2" />

						<div className="flex flex-col sm:flex-row gap-3 pt-2">
							<a
								href={project.githubUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="editorial-pill-btn flex-1 text-center justify-center bg-[#F4EFE4] !text-[#14130F] hover:!bg-[#1F5C45] hover:!text-[#F4EFE4]"
							>
								<ExternalLink className="w-4 h-4 mr-2" />
								View Project
							</a>
							<a
								href={project.githubUrl}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`View ${project.title} on GitHub`}
								className="px-5 py-3 rounded-full border border-[#D9D2C0]/30 hover:border-[#1F5C45] text-[#F4EFE4] hover:text-[#1F5C45] transition-colors flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.08em]"
							>
								<Github className="w-4 h-4" />
								GitHub
							</a>
						</div>
					</div>
				</div>
			</motion.div>
		</motion.div>,
		document.body
	);
}

/* ------------------------------------------------------------------ */
/*  Projects Section                                                  */
/* ------------------------------------------------------------------ */
export function Projects() {
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);

	const orderedProjects = [...projects].sort((a, b) => {
		const priorityDiff = (b.priority ?? 0) - (a.priority ?? 0);
		if (priorityDiff !== 0) return priorityDiff;
		return new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime();
	});

	const featuredProject = orderedProjects[0];
	const remainingProjects = orderedProjects.slice(1);

	const getShortDescription = (desc: string) => {
		const firstParagraph = desc.split("\n\n")[0] || desc;
		return firstParagraph.replace(/\*\*/g, "").replace(/\n/g, " ");
	};

	return (
		<section id="projects" className="editorial-section">
			<div className="section-container">
				{/* Section Header */}
				<div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-16 pb-6 border-b border-[#D9D2C0]">
					<div>
						<span className="font-mono text-xs uppercase tracking-[0.1em] text-[#1F5C45] block mb-2">
							(02) PROJECTS
						</span>
						<h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#14130F] font-normal tracking-tight">
							Featured Projects
						</h2>
					</div>
					<p className="font-sans text-sm sm:text-base text-[#6B665A] max-w-md text-left sm:text-right">
						Here are some of my recent projects that showcase my skills and passion for creating innovative solutions.
					</p>
				</div>

				{/* Featured / Main Project: Large Dark Card */}
				{featuredProject && (
					<div className="mb-20">
						<div
							className="editorial-dark-card cursor-pointer group"
							onClick={() => setSelectedProject(featuredProject)}
							role="button"
							tabIndex={0}
							aria-label={`View details for ${featuredProject.title}`}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									setSelectedProject(featuredProject);
								}
							}}
						>
							<div className="card-2col">
								{/* Left: Text Panel (High contrast, clean hierarchy) */}
								<div className="flex flex-col gap-5 relative z-10">
									<div className="flex items-center gap-2">
										<span className="font-mono text-xs uppercase tracking-[0.12em] text-[#1F5C45] bg-[#1F5C45]/15 px-3 py-1 rounded-full border border-[#1F5C45]/30">
											Featured Work (01)
										</span>
									</div>

									<h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F4EFE4] leading-[1.1] font-normal">
										{featuredProject.title}
									</h3>

									<p className="font-sans text-base sm:text-lg text-[#D9D2C0]/85 leading-relaxed line-clamp-3">
										{getShortDescription(featuredProject.description)}
									</p>

									{/* Tech Tags */}
									<div className="flex flex-wrap gap-2 pt-1">
										{featuredProject.tags.map((tag) => (
											<span
												key={tag}
												className="font-mono text-[11px] uppercase tracking-[0.08em] px-3 py-1 rounded-full border border-[#D9D2C0]/25 text-[#D9D2C0]"
											>
												{tag}
											</span>
										))}
									</div>

									{/* Action Bar */}
									<div className="pt-3 flex flex-wrap items-center gap-4">
										<button
											type="button"
											className="editorial-pill-btn bg-[#F4EFE4] !text-[#14130F] hover:!bg-[#1F5C45] hover:!text-[#F4EFE4] text-xs py-2.5 px-6"
											onClick={(e) => {
												e.stopPropagation();
												setSelectedProject(featuredProject);
											}}
										>
											View Project Details
										</button>
										<a
											href={featuredProject.githubUrl}
											target="_blank"
											rel="noopener noreferrer"
											onClick={(e) => e.stopPropagation()}
											className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.08em] text-[#D9D2C0] hover:text-[#F4EFE4] transition-colors py-2"
										>
											GitHub Repo <ArrowUpRight className="w-3.5 h-3.5" />
										</a>
									</div>
								</div>

								{/* Right: Visual Panel with Concentric Circles Strictly Contained */}
								<div className="visual-panel shadow-xl">
									{/* Decorative Concentric Circles inside the visual panel only */}
									<svg
										className="absolute -right-6 -top-6 w-56 h-56 opacity-20 pointer-events-none z-10"
										viewBox="0 0 200 200"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<circle cx="100" cy="100" r="25" stroke="#F4EFE4" strokeWidth="0.75" />
										<circle cx="100" cy="100" r="50" stroke="#F4EFE4" strokeWidth="0.75" />
										<circle cx="100" cy="100" r="75" stroke="#F4EFE4" strokeWidth="0.75" />
										<circle cx="100" cy="100" r="95" stroke="#F4EFE4" strokeWidth="0.75" />
									</svg>

									<img
										src={featuredProject.image}
										alt={featuredProject.title}
										className="visual-img filter brightness-95 group-hover:scale-105 transition-transform duration-500"
										loading="lazy"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-[#14130F]/50 via-transparent to-transparent pointer-events-none" />
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Remaining Projects: Editorial List Rows */}
				{remainingProjects.length > 0 && (
					<div className="border-t border-[#D9D2C0]">
						{remainingProjects.map((project, idx) => {
							const formattedIndex = String(idx + 2).padStart(2, "0");
							return (
								<div
									key={project.title}
									onClick={() => setSelectedProject(project)}
									role="button"
									tabIndex={0}
									aria-label={`View details for ${project.title}`}
									onKeyDown={(e) => {
										if (e.key === "Enter" || e.key === " ") {
											e.preventDefault();
											setSelectedProject(project);
										}
									}}
									className="editorial-list-row cursor-pointer group px-3 sm:px-4 rounded-lg"
								>
									{/* Index & Title */}
									<div className="project-row-left">
										<span className="font-mono text-xs sm:text-sm uppercase tracking-[0.1em] text-[#1F5C45] shrink-0">
											({formattedIndex})
										</span>
										<div>
											<h3 className="font-serif text-2xl sm:text-3xl text-[#14130F] group-hover:text-[#1F5C45] transition-colors leading-snug">
												{project.title}
											</h3>
										</div>
									</div>

									{/* Description Preview */}
									<div className="project-row-mid">
										<p className="font-sans text-sm text-[#6B665A] line-clamp-2 leading-relaxed">
											{getShortDescription(project.description)}
										</p>
									</div>

									{/* Categories and Arrow */}
									<div className="project-row-right">
										<div className="flex flex-wrap gap-1.5">
											{project.tags.map((tag) => (
												<span
													key={tag}
													className="font-mono text-[10px] uppercase tracking-[0.05em] px-2.5 py-0.5 rounded-full border border-[#D9D2C0] text-[#6B665A]"
												>
													{tag}
												</span>
											))}
										</div>
										<div className="w-10 h-10 rounded-full border border-[#D9D2C0] flex items-center justify-center shrink-0 group-hover:border-[#1F5C45] group-hover:bg-[#1F5C45] group-hover:text-[#F4EFE4] text-[#14130F] transition-all">
											<ArrowUpRight className="w-4 h-4" />
										</div>
									</div>
								</div>
							);
						})}
					</div>
				)}
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