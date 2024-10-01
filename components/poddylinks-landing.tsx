"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, CheckCircle, Globe, Headphones } from "lucide-react";
import Link from "next/link";

export function PoddylinksLanding() {
	return (
		<div className="flex flex-col min-h-screen">
			<header className="px-4 lg:px-6 h-14 flex items-center">
				<Link className="flex items-center justify-center" href="#">
					<Headphones className="h-6 w-6 mr-2" />
					<span className="font-bold">PoddyLinks</span>
				</Link>
				<nav className="ml-auto flex gap-4 sm:gap-6">
					<Link
						className="text-sm font-medium hover:underline underline-offset-4"
						href="#features"
					>
						Features
					</Link>
					<Link
						className="text-sm font-medium hover:underline underline-offset-4"
						href="#how-it-works"
					>
						How It Works
					</Link>
					<Link
						className="text-sm font-medium hover:underline underline-offset-4"
						href="#pricing"
					>
						Pricing
					</Link>
				</nav>
			</header>
			<main className="flex-1">
				<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
					<div className="px-4 md:px-6">
						<div className="flex flex-col items-center space-y-4 text-center">
							<div className="space-y-2">
								<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none font-heading">
									Smart Links for Smart Podcasters
								</h1>
								<p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
									PoddyLinks helps you create one link for all your podcast
									platforms. Boost your audience and simplify sharing.
								</p>
							</div>
							<div className="space-x-4">
								<Button>Get Started</Button>
								<Button variant="outline">Learn More</Button>
							</div>
						</div>
					</div>
				</section>
				<section
					id="features"
					className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
				>
					<div className="px-4 md:px-6">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 font-heading">
							Why Choose PoddyLinks?
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<Card>
								<CardHeader>
									<Globe className="w-8 h-8 mb-2" />
									<CardTitle>One Link for All Platforms</CardTitle>
								</CardHeader>
								<CardContent>
									Create a single link that directs listeners to your podcast on
									their preferred platform.
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<BarChart className="w-8 h-8 mb-2" />
									<CardTitle>Detailed Analytics</CardTitle>
								</CardHeader>
								<CardContent>
									Track clicks, geographic data, and platform preferences to
									optimize your podcast's reach.
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CheckCircle className="w-8 h-8 mb-2" />
									<CardTitle>Easy to Use</CardTitle>
								</CardHeader>
								<CardContent>
									Set up your PoddyLink in minutes with our intuitive dashboard.
									No technical skills required.
								</CardContent>
							</Card>
						</div>
					</div>
				</section>
				<section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
					<div className="px-4 md:px-6">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 font-heading">
							How It Works
						</h2>
						<ol className="grid grid-cols-1 md:grid-cols-3 gap-6 list-decimal list-inside">
							<li className="text-lg font-semibold mb-2">
								Create Your PoddyLink
								<p className="text-base font-normal text-gray-500 dark:text-gray-400 mt-2">
									Sign up and generate your unique PoddyLink in just a few
									clicks.
								</p>
							</li>
							<li className="text-lg font-semibold mb-2">
								Add Your Podcast Platforms
								<p className="text-base font-normal text-gray-500 dark:text-gray-400 mt-2">
									Connect all the platforms where your podcast is available.
								</p>
							</li>
							<li className="text-lg font-semibold mb-2">
								Share and Grow
								<p className="text-base font-normal text-gray-500 dark:text-gray-400 mt-2">
									Use your PoddyLink everywhere to simplify sharing and expand
									your audience.
								</p>
							</li>
						</ol>
					</div>
				</section>
				<section
					id="pricing"
					className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
				>
					<div className="px-4 md:px-6">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 font-heading">
							Simple, Transparent Pricing
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<Card>
								<CardHeader>
									<CardTitle>Basic</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-4xl font-bold">$9/mo</p>
									<ul className="mt-4 space-y-2">
										<li className="flex items-center">
											<CheckCircle className="w-4 h-4 mr-2 text-green-500" />1
											PoddyLink
										</li>
										<li className="flex items-center">
											<CheckCircle className="w-4 h-4 mr-2 text-green-500" />
											Basic Analytics
										</li>
										<li className="flex items-center">
											<CheckCircle className="w-4 h-4 mr-2 text-green-500" />
											Email Support
										</li>
									</ul>
									<Button className="w-full mt-6">Choose Basic</Button>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>Pro</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-4xl font-bold">$19/mo</p>
									<ul className="mt-4 space-y-2">
										<li className="flex items-center">
											<CheckCircle className="w-4 h-4 mr-2 text-green-500" />5
											PoddyLinks
										</li>
										<li className="flex items-center">
											<CheckCircle className="w-4 h-4 mr-2 text-green-500" />
											Advanced Analytics
										</li>
										<li className="flex items-center">
											<CheckCircle className="w-4 h-4 mr-2 text-green-500" />
											Priority Support
										</li>
									</ul>
									<Button className="w-full mt-6">Choose Pro</Button>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>Enterprise</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-4xl font-bold">Custom</p>
									<ul className="mt-4 space-y-2">
										<li className="flex items-center">
											<CheckCircle className="w-4 h-4 mr-2 text-green-500" />
											Unlimited PoddyLinks
										</li>
										<li className="flex items-center">
											<CheckCircle className="w-4 h-4 mr-2 text-green-500" />
											Custom Analytics
										</li>
										<li className="flex items-center">
											<CheckCircle className="w-4 h-4 mr-2 text-green-500" />
											Dedicated Support
										</li>
									</ul>
									<Button className="w-full mt-6">Contact Sales</Button>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32">
					<div className="px-4 md:px-6">
						<div className="flex flex-col items-center space-y-4 text-center">
							<div className="space-y-2">
								<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-heading">
									Ready to Simplify Your Podcast Sharing?
								</h2>
								<p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
									Join thousands of podcasters using PoddyLinks to grow their
									audience and streamline their sharing process.
								</p>
							</div>
							<div className="space-x-4">
								<Button size="lg">Get Started Now</Button>
								<Button size="lg" variant="outline">
									Request a Demo
								</Button>
							</div>
						</div>
					</div>
				</section>
			</main>
			<footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-centerpx-4 md:px-6 border-t">
				<p className="text-xs text-gray-500 dark:text-gray-400">
					© 2024 PoddyLinks. All rights reserved.
				</p>
				<nav className="sm:ml-auto flex gap-4 sm:gap-6">
					<Link className="text-xs hover:underline underline-offset-4" href="#">
						Terms of Service
					</Link>
					<Link className="text-xs hover:underline underline-offset-4" href="#">
						Privacy
					</Link>
				</nav>
			</footer>
		</div>
	);
}
