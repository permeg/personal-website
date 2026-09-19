export interface Project {
  id: string
  name: string
  description: string
  skills: string[]
  /** The row's name and empty space link to `live`, falling back to `github`. */
  links: { live?: string; github?: string }
  /**
   * Not built yet: the Live and GitHub buttons still show but do nothing.
   * When a project ships, fill in `links` and delete this line.
   */
  comingSoon?: boolean
}

export const projects: Project[] = [
  {
    id: 'cart-compass',
    name: 'Cart Compass',
    description:
      'Grocery prices keep climbing and comparing stores by hand is a chore. Cart Compass checks real-time prices at nearby stores and plans the cheapest route for your basket, weighing the cost of driving somewhere else against what you would save, and nudging you toward a substitute when swapping brands is the smarter buy.',
    skills: ['Route optimization', 'Price data aggregation', 'Search indexing', 'Consumer choice theory', 'Cross-price elasticity', 'Interactive maps'],
    links: {
      live: 'https://cartcompass.permeg.com/',
      github: 'https://github.com/permeg/CartCompass',
    },
  },
  {
    id: 'hms',
    name: 'Synaptech Hardware Management System',
    description:
      'A hardware management system for the Synaptech club. Members browse the equipment inventory and request a checkout with a signed loan agreement; admins hand hardware out and back in by barcode, audit storage, and keep the inventory accurate. Sign-in is limited to UW Google accounts, and every change lands in an audit log.',
    skills: ['React', 'TypeScript', 'Vite', 'Supabase', 'PostgreSQL', 'React Router', 'Vitest', 'Cloudflare'],
    links: {
      live: 'https://hardware.synaptechuw.org/',
      github: 'https://github.com/galaxygoldfish/synaptech-hms',
    },
  },
  {
    id: 'use-it-up',
    name: 'Use It Up',
    description:
      'Snap a photo of your fridge, pantry, or plate and get back what you actually have, then recipes built around it instead of the fantasy pantry most recipe apps assume. Can’t tell yogurt from sour cream? It asks instead of guessing. One ingredient short? It suggests a swap or tells you what to buy. Built by a student tired of throwing out forgotten leftovers.',
    skills: ['Multimodal LLMs', 'Prompt engineering', 'Recipe search', 'Uncertainty-aware UX', 'React', 'TypeScript'],
    links: {},
    comingSoon: true,
  },
  {
    id: 'adversarial-noise-studio',
    name: 'Adversarial Noise Studio',
    description:
      'Sprinkle in a little invisible noise and watch a neural network confidently get it wrong. A pre-trained image classifier runs entirely in your browser while you apply FGSM adversarial noise in real time. Drag the epsilon slider to see exactly where the model breaks, with the original, the noise, and the fooled result side by side and live confidence bars.',
    skills: ['Adversarial ML (FGSM)', 'Client-side inference', 'ONNX Runtime Web / TensorFlow.js', 'Canvas API', 'Model robustness', 'TypeScript'],
    links: {},
    comingSoon: true,
  },
]
