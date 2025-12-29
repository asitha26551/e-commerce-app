import React from 'react'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Button } from '../components/ui/Button'
import {
  Users,
  Heart,
  ShieldCheck,
  Zap,
  Target,
  Trophy,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export function AboutPage() {
  const team = [
    {
      name: 'Alex Morgan',
      role: 'CEO & Founder',
      bio: 'Ex-pro gamer turned visionary leader.',
      image: 'https://picsum.photos/seed/person1/400/400',
    },
    {
      name: 'Sarah Chen',
      role: 'Head of Product',
      bio: 'Hardware enthusiast obsessed with performance.',
      image: 'https://picsum.photos/seed/person2/400/400',
    },
    {
      name: 'Marcus Johnson',
      role: 'CTO',
      bio: 'Building the future of gaming tech.',
      image: 'https://picsum.photos/seed/person3/400/400',
    },
    {
      name: 'Emily Davis',
      role: 'Head of Design',
      bio: 'Creating aesthetics that define the meta.',
      image: 'https://picsum.photos/seed/person4/400/400',
    },
  ]

  const values = [
    {
      icon: ShieldCheck,
      title: 'Trust & Security',
      description:
        'Bank-level security for every transaction. No hacks allowed.',
    },
    {
      icon: Heart,
      title: 'Player First',
      description: 'Built by gamers, for gamers. We know what you need.',
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Only the fastest, most reliable gear makes the cut.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Supporting the scene from grassroots to pro tier.',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background text-text">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-background py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/gaming-setup/2000/1000')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background"></div>
          <div className="absolute inset-0 scan-lines pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-block px-3 py-1 mb-6 border border-primary/50 rounded-full bg-primary/10 backdrop-blur-sm">
              <span className="text-primary font-bold tracking-wider text-sm uppercase">
                GAMEZONE
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-black mb-6 text-white leading-tight">
              REDEFINING THE <br />
              <span className="gradient-text text-shadow-glow">GAME</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              We're on a mission to equip every player with the tools they need
              to dominate. From casual lobbies to championship stages.
            </p>
            <Link to="/contact">
              <Button variant="cta" size="lg">
                CONTACT US
              </Button>
            </Link>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-surface relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-lg opacity-75 blur-lg group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <img
                  src="https://picsum.photos/seed/story/800/600"
                  alt="Our Story"
                  className="relative rounded-lg shadow-2xl border border-border bg-background"
                />
              </div>
              <div className="md:w-1/2">
                <div className="flex items-center mb-4">
                  <Target className="h-6 w-6 text-accent mr-2" />
                  <h2 className="text-3xl font-display font-bold text-white">
                    OUR ORIGIN STORY
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    Founded in 2020, GameZone started as a LAN party dream. We
                    were tired of overpriced, underperforming gear. So we
                    decided to change the meta.
                  </p>
                  <p>
                    What began in a garage has leveled up into a global hub for
                    gaming excellence. We curate only the best equipment, tested
                    by real players in real matches.
                  </p>
                  <p>
                    Today, we're more than a store. We're a community of
                    enthusiasts, pros, and creators pushing the boundaries of
                    what's possible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-display font-bold text-white mb-4">
                CORE <span className="text-primary">STATS</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                The principles that power our gameplay and business.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-surface p-8 rounded-lg border border-border hover:border-primary hover:shadow-neon-purple transition-all group text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-background border border-border group-hover:border-primary group-hover:shadow-neon-purple transition-all mb-6">
                    <value.icon className="h-8 w-8 text-white group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-400">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team/Roster section removed as requested */}

        {/* CTA */}
        <section className="py-20 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-20"></div>
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-6">
              READY TO START?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Equip yourself with the best gear in the game.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button variant="cta" size="lg">
                  ENTER SHOP
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  CONTACT SUPPORT
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
