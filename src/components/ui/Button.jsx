import * as React from "react";
// Para composición de componentes - Slot
import { Slot } from "@radix-ui/react-slot";
// Para variantes de estilos - cva
import { cva } from "class-variance-authority";
// Utilidad para combinar clases CSS - cn
import { cn } from './utils';


const buttonVariants = cva(
    // Clases base que aplican a TODOS los botones
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
        variant: { // Diferentes estilos visuales
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive:  // Rojo/error
                "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: // Con borde
                "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
            secondary: // Secundario
                "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: // Transparente con hover
                "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
            link: "text-primary underline-offset-4 hover:underline", // Estilo enlace
        }, 
        size: { // Diferentes tamaños
            default: "h-9 px-4 py-2 has-[>svg]:px-3",
            sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-4", // Pequeño
            lg: "h-10 rounded-md px-6 has-[>svg]:px-4", // Grande
            icon: "size-9 rounded-md", // Cuadrado para iconos
        },
    },
    defaultVariants: { // Valores por defecto
        variant: "default",
        size: "default",
    },
  },
);

/* 
    - disabled:pointer-events-none: Desactiva interacción cuando está deshabilitado
    - [&_svg]:pointer-events-none: Los SVG dentro no reciben eventos del mouse
    - has-[>svg]:px-3: Aplica padding diferente cuando contiene SVG
    - focus-visible:: Estilos para accesibilidad (focus con teclado)
    - dark:: Modo oscuro
    - aria-invalid:: Estilos para estado de error
 */

function Button({
    className,
    variant,
    size,
    asChild = false,
    ...props
}) {
    const Comp = asChild ? Slot : "button"; // Renderiza como Slot o button
    return (
        <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}

/*
    - asChild: Permite usar otro componente como base (composición)
    - ...props: Pasa todas las props restantes al componente base
    
    ¿Qué hace asChild?
        Es la característica más importante:
        - asChild={false} (default): Renderiza como <button>
        - asChild={true}: Renderiza como Slot - pasa las props al hijo directo
*/

export { Button, buttonVariants };