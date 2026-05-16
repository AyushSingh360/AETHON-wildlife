import { Mail, Heart, Gift } from "lucide-react";
import { motion } from "framer-motion";

export function BottomNav() {
  const links = [
    { href: "#contact", label: "Contact", icon: <Mail className="w-5 h-5" /> },
    { href: "#newsletter", label: "Newsletter", icon: <Mail className="w-5 h-5" /> },
    { href: "#social", label: "Social", icon: <Mail className="w-5 h-5" /> },
    { href: "#membership", label: "Membership", icon: <Gift className="w-5 h-5" /> },
    { href: "#donate-page", label: "Donate", icon: <Heart className="w-5 h-5" /> },
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="fixed bottom-0 left-0 right-0 z-[10001] bg-glass-dark glass-dark backdrop-blur-md border-t border-border/20 p-2"
    >
      <ul className="flex justify-between items-center max-w-xl mx-auto">
        {links.map((link) => (
          <li key={link.href} className="flex-1 text-center">
            <a href={link.href} className="flex flex-col items-center text-xs text-muted-foreground hover:text-primary transition-colors">
              {link.icon}
              <span>{link.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
