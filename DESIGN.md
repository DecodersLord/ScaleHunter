# Design System Specification: Kinetic Sovereignty

## 1. Overview & Creative North Star

**Creative North Star: "The Digital Monarch"**

This design system is not a mere interface; it is a manifestation of power and progression. Inspired by the high-stakes evolution of _Solo Leveling_, we move away from the "friendly" web of rounded corners and soft pastels. Instead, we embrace **Aggressive Precision**.

We break the "template" look through **Intentional Asymmetry**. Layouts should feel like a tactical HUD—leaning into sharp, 0px radius corners and heavy typographic scaling. By overlapping glassmorphic panels and utilizing high-contrast "mana" accents against deep black voids, we create an editorial experience that feels both premium and perilous. Every interaction should feel like a "Rank Up."

---

## 2. Colors & Environmental Depth

The palette is rooted in the "Void"—a deep, immersive black—punctuated by the electric energy of "Mana" (Primary) and "Awakening" (Secondary).

### Surface Hierarchy & Nesting

To achieve a high-end feel, we banish flat design. We use **Tonal Layering** to create a sense of physical space.

- **The Foundation:** `surface` (#131313) is your base canvas.
- **The Depth:** Use `surface_container_lowest` (#0e0e0e) for background "cut-outs" and `surface_container_high` (#2a2a2a) for elevated tactical panels.
- **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Define boundaries through color shifts. A `surface_container_low` section sitting on a `surface` background provides all the separation needed.

### Signature Textures: The "Mana" Glow

- **The Glass & Gradient Rule:** For primary CTAs and active states, use a linear gradient transitioning from `primary` (#aec6ff) to `primary_container` (#4d8eff) at a 135-degree angle.
- **Glassmorphism:** Floating HUD elements must use `surface_variant` at 40% opacity with a `20px` backdrop-blur. This ensures the "Void" background bleeds through, creating a sense of layered complexity.

---

## 3. Typography

The typographic voice is a duality between the "System" (UI) and the "Player" (Display).

- **Display & Headlines (Space Grotesk):** This is our "aggressive" voice. Use `display-lg` for critical rank indicators or level-up moments. The wide, sharp stance of Space Grotesk mirrors the sharp edges of the UI.
- **Body & Labels (Inter):** The "System" voice. Inter provides high legibility at small scales, essential for dense RPG-style stats.
- **Visual Hierarchy:** Use extreme contrast. Pair a `display-lg` rank (e.g., "S-RANK") with a `label-sm` subtext to create an authoritative, editorial feel.

---

## 4. Elevation & Depth

In this system, elevation is not about "softness"—it is about "energy."

- **The Layering Principle:** Stack containers to show importance. A `surface_container_highest` card on a `surface_dim` background suggests the item is "equipped" or active.
- **Ambient Shadows:** We avoid generic black shadows. Instead, use a tinted shadow: `0px 20px 40px rgba(0, 90, 195, 0.08)`. This subtle blue tint makes the UI feel like it's glowing from within.
- **The "Ghost Border" Fallback:** If a border is required for accessibility, use `outline_variant` at 15% opacity. It should be felt, not seen.
- **Glow States:** Active elements (like a selected quest) should utilize a `0px 0px 15px` outer glow using the `tertiary` (#00dbe9) token to simulate mana radiation.

---

## 5. Components

### Buttons (Tactical Triggers)

- **Primary:** Sharp corners (0px), `primary` background, `on_primary` text. Add a 1px "Ghost Border" of `primary_fixed` for a surgical finish.
- **Secondary:** Ghost style. Transparent background, `primary` text, and a 1px border at 30% opacity.
- **Interaction:** On hover, the button should "pulse"—increase the outer glow (box-shadow) using the `tertiary` color.

### RPG Status Bars (Progress/XP)

- **Container:** `surface_container_highest`.
- **Fill:** A gradient from `secondary` (#d8b9ff) to `on_secondary_container` (#d5b5ff).
- **Styling:** No rounded ends. The fill should be a sharp block. For HP/MP equivalents, use `error` for health and `tertiary` for mana.

### Cards & Lists

- **The Rule:** Forbid divider lines. Separate items using `8px` of vertical whitespace or by alternating background tiers (e.g., `surface_container_low` vs `surface_container_lowest`).
- **Header Cards:** Use a `surface_bright` top-border (2px) to give a card a "header" feel without enclosing it in a box.

### HUD Overlays (Modals)

- Use the Glassmorphism rule. Modals should not be opaque; they should be "translucent tactical overlays" that blur the world behind them.

---

## 6. Do's and Don'ts

### Do:

- **Embrace Asymmetry:** Align text to the left while placing stats on the extreme right to create a "scanned" HUD look.
- **Use Sharp Corners:** 0px radius is mandatory. Curves represent weakness in this system.
- **Leverage Tonal Depth:** Use the full range of `surface_container` tokens to guide the eye.

### Don't:

- **Don't use "Standard" Blue:** Avoid default hex codes. Always use the provided `primary` (#aec6ff) which has the specific slate-blue desaturation required for a premium dark theme.
- **Don't use Dividers:** Never use a 1px line to separate content. It breaks the "monolithic" feel of the interface.
- **Don't Over-Glow:** If everything glows, nothing is important. Reserve `tertiary` accents for active "System" alerts or high-rank indicators.

---

## 7. Signature Interaction: The "System Scan"

When transitioning between views, use a horizontal "scan-line" animation—a 1px `tertiary` line that moves vertically across the screen, briefly revealing the content behind it. This reinforces the "System" lore and provides a high-end, custom feel that goes beyond standard fade-ins.
