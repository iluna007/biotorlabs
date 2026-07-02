// src/config/plantAnchor.js
//
// ANCHOR POINT DE LA PLANTA — fuente de verdad compartida entre Three.js y Rhino
//
// Este objeto define el "socket" donde la planta se inserta en la escena.
// Tres.js lo usa para posicionar el placeholder low-poly.
// Rhino/Blender lo usan como referencia de escala y pivot para el modelo final.
//
// UNIDADES: 1 unidad Three.js = 1 metro en Rhino (si exportas en metros)
//            O: 1 unidad Three.js = 1000 mm en Rhino (si exportas en mm)
//
// IMPORTANTE: NO cambies estos valores sin actualizar ambos lados (código + modelo 3D)

export const PLANT_ANCHOR = {
  // ── POSICIÓN DEL PIVOT (base del tallo, a nivel del suelo) ──────────────
  position: { x: 0.0, y: 0.0, z: 0.0 },   // siempre en el origen del suelo

  // ── ROTACIÓN (euler en radianes, orden YXZ) ──────────────────────────────
  rotation: { x: 0.0, y: 0.0, z: 0.0 },   // sin rotación inicial

  // ── ESCALA BASE (1.0 = tamaño real definido abajo) ───────────────────────
  scale: { x: 1.0, y: 1.0, z: 1.0 },

  // ── DIMENSIONES DEL BOUNDING BOX ESPERADO ───────────────────────────────
  // Tu modelo de Rhino debe caber dentro de estas dimensiones
  boundingBox: {
    width:  1.2,   // metros de ancho máximo (X)
    height: 2.8,   // metros de alto (Y) — el tallo llega hasta y=2.8
    depth:  1.2,   // metros de profundidad (Z)
  },

  // ── DIRECCIÓN "ARRIBA" de la planta ─────────────────────────────────────
  upVector: { x: 0.0, y: 1.0, z: 0.0 },

  // ── NOTAS PARA EL MODELADOR ─────────────────────────────────────────────
  modelingNotes: {
    rhinoUnits: 'meters',              // modelar en METROS en Rhino
    pivotAt:    'base of stem at y=0', // el punto 0,0,0 debe ser la BASE del tallo
    exportAs:   'GLB',
    exportSettings: {
      yUp:           true,
      applyTransform: true,
      draco:         false,            // sin compresión (Three.js lo maneja)
      maxFileSizeMB: 5,
    },
    targetFilePath: '/public/models/plant_trichomax.glb',
    // Cultivos de referencia visual para modelar:
    // TrichoMax+ está diseñado para ARROZ, CAÑA DE AZÚCAR y MANÍ.
    // Se recomienda modelar CAÑA DE AZÚCAR joven (la más representativa visualmente)
    suggestedCrop: 'sugarcane_young',
  },
}
