import { motion, useScroll, useTransform } from 'framer-motion';
import classNames from 'classnames';

type ParallaxLayerProps = {
  src: string;
  strength?: number;
  className?: string;
  opacity?: number;
};

export function ParallaxLayer({ src, strength = 0.05, className, opacity = 0.3 }: ParallaxLayerProps) {
  const { scrollY } = useScroll();
  const translateY = useTransform(scrollY, (value) => -value * strength);

  return (
    <motion.img
      aria-hidden="true"
      src={src}
      alt=""
      style={{ y: translateY, opacity }}
      className={classNames(
        'pointer-events-none absolute inset-0 z-[1] mx-auto select-none object-contain mix-blend-screen',
        className
      )}
    />
  );
}
