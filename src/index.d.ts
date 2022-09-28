import {
  ConfigOptions,
  GlobeInstance as GlobeKapsuleInstance,
} from "globe.gl-fork"
import * as React from "react"
import { Camera, Material, Object3D, Scene, WebGLRenderer } from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"

type Accessor<In, Out> = Out | string | ((obj: In) => Out)
type ObjAccessor<T> = Accessor<object, T>

interface TypeFace {}

type LabelOrientation = "right" | "top" | "bottom"

interface GeoCoords {
  lat: number
  lng: number
  altitude: number
}

interface CartesianCoords {
  x: number
  y: number
  z: number
}

interface ScreenCoords {
  x: number
  y: number
}

export interface GlobeProps extends ConfigOptions {
  // Container layout
  width?: number
  height?: number
  backgroundColor?: string
  backgroundImageUrl?: string | null

  // Globe layer
  globeImageUrl?: string | null
  bumpImageUrl?: string | null
  showGlobe?: boolean
  showGraticules?: boolean
  showAtmosphere?: boolean
  atmosphereColor?: string
  atmosphereAltitude?: number
  globeMaterial?: Material
  onGlobeReady?: () => void
  onGlobeClick?: (
    coords: { lat: number; lng: number },
    event: MouseEvent
  ) => void
  onGlobeRightClick?: (
    coords: { lat: number; lng: number },
    event: MouseEvent
  ) => void

  // Paths layer
  pathsData?: object[]
  pathPoints?: ObjAccessor<any[]>
  pathPointLat?: Accessor<any, number>
  pathPointLng?: Accessor<any, number>
  pathPointAlt?: Accessor<any, number>
  pathResolution?: number
  pathColor?: ObjAccessor<string | string[] | ((t: number) => string)>
  pathStroke?: ObjAccessor<number | null>
  pathDashLength?: ObjAccessor<number>
  pathDashGap?: ObjAccessor<number>
  pathDashInitialGap?: ObjAccessor<number>
  pathDashAnimateTime?: ObjAccessor<number>
  pathTransitionDuration?: number
  pathLabel?: ObjAccessor<string>
  onPathClick?: (
    path: object,
    event: MouseEvent,
    coords: { lat: number; lng: number; altitude: number }
  ) => void
  onPathRightClick?: (
    path: object,
    event: MouseEvent,
    coords: { lat: number; lng: number; altitude: number }
  ) => void
  onPathHover?: (path: object | null, prevPath: object | null) => void

  // Labels layer
  labelsData?: object[]
  labelLat?: ObjAccessor<number>
  labelLng?: ObjAccessor<number>
  labelText?: ObjAccessor<string>
  labelColor?: ObjAccessor<string>
  labelAltitude?: ObjAccessor<number>
  labelSize?: ObjAccessor<number>
  labelTypeFace?: TypeFace
  labelRotation?: ObjAccessor<number>
  labelResolution?: number
  labelIncludeDot?: ObjAccessor<boolean>
  labelDotRadius?: ObjAccessor<number>
  labelDotOrientation?: ObjAccessor<LabelOrientation>
  labelsTransitionDuration?: number
  labelLabel?: ObjAccessor<string>
  onLabelClick?: (
    label: object,
    event: MouseEvent,
    coords: { lat: number; lng: number; altitude: number }
  ) => void
  onLabelRightClick?: (
    label: object,
    event: MouseEvent,
    coords: { lat: number; lng: number; altitude: number }
  ) => void
  onLabelHover?: (label: object | null, prevLabel: object | null) => void

  // HTML Elements layer
  htmlElementsData?: object[]
  htmlLat?: ObjAccessor<number>
  htmlLng?: ObjAccessor<number>
  htmlAltitude?: ObjAccessor<number>
  htmlElement?: string | ((d: object) => HTMLElement)
  htmlTransitionDuration?: number

  // 3D Objects layer
  objectsData?: object[]
  objectLat?: ObjAccessor<number>
  objectLng?: ObjAccessor<number>
  objectAltitude?: ObjAccessor<number>
  objectThreeObject?: Object3D | string | ((d: object) => Object3D)
  objectLabel?: ObjAccessor<string>
  onObjectClick?: (
    obj: object,
    event: MouseEvent,
    coords: { lat: number; lng: number; altitude: number }
  ) => void
  onObjectRightClick?: (
    obj: object,
    event: MouseEvent,
    coords: { lat: number; lng: number; altitude: number }
  ) => void
  onObjectHover?: (obj: object | null, prevObj: object | null) => void

  // Custom layer
  customLayerData?: object[]
  customThreeObject?: Object3D | string | ((d: object) => Object3D)
  customThreeObjectUpdate?: string | ((obj: Object3D, objData: object) => void)
  customLayerLabel?: ObjAccessor<string>
  onCustomLayerClick?: (
    obj: object,
    event: MouseEvent,
    coords: { lat: number; lng: number; altitude: number }
  ) => void
  onCustomLayerRightClick?: (
    obj: object,
    event: MouseEvent,
    coords: { lat: number; lng: number; altitude: number }
  ) => void
  onCustomLayerHover?: (obj: object | null, prevObj: object | null) => void

  // Render control
  enablePointerInteraction?: boolean
  pointerEventsFilter?: (object: Object3D, data?: object) => boolean
  lineHoverPrecision?: number
  onZoom?: (pov: GeoCoords) => void
}

export interface GlobeMethods {
  // Render control
  pointOfView(): GeoCoords
  pointOfView(
    pov: { lat?: number; lng?: number; altitude?: number },
    transitionMs?: number
  ): GlobeKapsuleInstance
  pauseAnimation(): GlobeKapsuleInstance
  resumeAnimation(): GlobeKapsuleInstance
  scene(): Scene
  camera(): Camera
  renderer(): WebGLRenderer
  postProcessingComposer(): EffectComposer
  controls(): object

  // Utilities
  getGlobeRadius(): number
  getCoords(lat: number, lng: number, altitude?: number): CartesianCoords
  getScreenCoords(lat: number, lng: number, altitude?: number): ScreenCoords
  toGeoCoords(coords: CartesianCoords): GeoCoords
  toGlobeCoords(x: number, y: number): { lat: number; lng: number } | null
}

type FCwithRef<P = {}, R = {}> = React.FunctionComponent<
  P & { ref?: React.MutableRefObject<R | undefined> }
>

declare const Globe: FCwithRef<GlobeProps, GlobeMethods>

export default Globe
