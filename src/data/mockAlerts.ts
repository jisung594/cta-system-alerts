import { type CTAServiceAlert } from '../types/alerts';

export const MOCK_CTA_ALERTS: CTAServiceAlert[] = [
  {
    id: "101",
    headline: "Major Delays on Blue Line due to Signal Issues at Clark/Lake",
    shortDescription: "Trains are standing due to a signal problem at Clark/Lake. Major delays expected system-wide on the Blue Line.",
    fullDescription: "Blue Line trains are experiencing major delays in both directions due to an active signal clearance issue near the Clark/Lake subway station. Maintenance crews are on-site investigating. Consider alternative bus routes or the Brown Line for Loop travel.",
    severity: "critical",
    isPlanned: false,
    impactedServices: [
      { serviceType: "L", lineColor: "Blue", routeName: "Blue Line", routeId: "Blue" }
    ],
    eventStart: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 mins ago
    eventEnd: null
  },
  {
    id: "102",
    headline: "Red Line Stations Bypass: Planned Track Maintenance",
    shortDescription: "Northbound trains will bypass Jarvis, Morse, and Loyola stations this weekend.",
    fullDescription: "To accommodate scheduled structural track repairs, northbound Red Line trains will run express from Wilson to Howard, bypassing Jarvis, Morse, and Loyola stations. Shuttle buses will operate between these stations for local service.",
    severity: "minor",
    isPlanned: true,
    impactedServices: [
      { serviceType: "L", lineColor: "Red", routeName: "Red Line", routeId: "Red" }
    ],
    eventStart: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), // Starting in 6 hours
    eventEnd: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString() // Ends in 48 hours
  },
  {
    id: "103",
    headline: "Brown and Purple Line Delays: Mechanical Failure",
    shortDescription: "Delays at Belmont due to a northbound train with mechanical issues.",
    fullDescription: "Northbound Brown and Purple Line Express trains are standing at Belmont due to a train experiencing mechanical issues. Crews are actively working to move the train to a pocket track. Expect 15-20 minute delays.",
    severity: "major",
    isPlanned: false,
    impactedServices: [
      { serviceType: "L", lineColor: "Brown", routeName: "Brown Line", routeId: "Brown" },
      { serviceType: "L", lineColor: "Purple", routeName: "Purple Line", routeId: "Purple" }
    ],
    eventStart: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 mins ago
    eventEnd: null
  },
  {
    id: "104",
    headline: "#66 Chicago Bus Reroute: Street Festival",
    shortDescription: "Buses rerouted on Chicago Ave between Damen and Wood.",
    fullDescription: "Due to the West Town Street Festival, #66 Chicago buses are temporarily rerouted in both directions via Damen, Division, and Wood. Regular service will resume early Monday morning.",
    severity: "minor",
    isPlanned: true,
    impactedServices: [
      { serviceType: "Bus", routeName: "66 Chicago", routeId: "66" }
    ],
    eventStart: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // Started 2 hours ago
    eventEnd: new Date(Date.now() + 36 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "105",
    headline: "Orange Line Medical Emergency: Midway Station Boarding Pause",
    shortDescription: "Train movement is temporarily paused at Midway while emergency crews assist a customer.",
    fullDescription: "Orange Line service is delayed near Midway due to a medical emergency that required station personnel to pause boarding for several minutes. Riders should expect residual delays as trains resume normal spacing.",
    severity: "critical",
    isPlanned: false,
    impactedServices: [
      { serviceType: "L", lineColor: "Orange", routeName: "Orange Line", routeId: "Orange" }
    ],
    eventStart: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    eventEnd: null
  },
  {
    id: "106",
    headline: "Green Line Slow Zones: Track Inspection at Conservatory",
    shortDescription: "Trains are moving at reduced speed between Conservatory and Ashland for inspection work.",
    fullDescription: "Green Line riders should expect slower-than-normal travel due to track inspection at Conservatory. Crews are working to complete the inspection and restore full speed as quickly as possible.",
    severity: "major",
    isPlanned: true,
    impactedServices: [
      { serviceType: "L", lineColor: "Green", routeName: "Green Line", routeId: "Green" }
    ],
    eventStart: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    eventEnd: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "107",
    headline: "Pink Line Short Turns: Train Crew Availability",
    shortDescription: "Some southbound Pink Line trips are being short-turned at Damen due to crew availability.",
    fullDescription: "Pink Line trains are operating with short turns to manage staffing levels. Customers should expect occasional gaps in service and longer wait times during the peak period.",
    severity: "minor",
    isPlanned: false,
    impactedServices: [
      { serviceType: "L", lineColor: "Pink", routeName: "Pink Line", routeId: "Pink" }
    ],
    eventStart: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
    eventEnd: null
  },
  {
    id: "108",
    headline: "Yellow Line Delays: Power Issue at Dempster-Skokie",
    shortDescription: "A power issue is causing slower travel between Dempster and Skokie stations.",
    fullDescription: "Yellow Line trains are running with delays after a reported power issue near the Dempster-Skokie station area. Maintenance teams are actively troubleshooting the issue.",
    severity: "major",
    isPlanned: false,
    impactedServices: [
      { serviceType: "L", lineColor: "Yellow", routeName: "Yellow Line", routeId: "Yellow" }
    ],
    eventStart: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    eventEnd: null
  },
  {
    id: "109",
    headline: "Red and Blue Lines: Tunnel Ventilation Maintenance",
    shortDescription: "Service is reduced between the Loop and North Side while ventilation systems are tested.",
    fullDescription: "Red and Blue Line trains are experiencing reduced service and additional dwell time while maintenance crews complete ventilation system testing in the Loop tunnel. Expect longer travel times.",
    severity: "critical",
    isPlanned: true,
    impactedServices: [
      { serviceType: "L", lineColor: "Red", routeName: "Red Line", routeId: "Red" },
      { serviceType: "L", lineColor: "Blue", routeName: "Blue Line", routeId: "Blue" }
    ],
    eventStart: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    eventEnd: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "110",
    headline: "Brown Line Trains Holding at Armitage: Door Problem",
    shortDescription: "A train is holding at Armitage while a door issue is investigated.",
    fullDescription: "Brown Line riders may see short holds at Armitage while crews inspect a door issue on a northbound train. The disruption is expected to clear quickly once the train is moved.",
    severity: "minor",
    isPlanned: false,
    impactedServices: [
      { serviceType: "L", lineColor: "Brown", routeName: "Brown Line", routeId: "Brown" }
    ],
    eventStart: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    eventEnd: null
  },
  {
    id: "111",
    headline: "Green and Pink Line Suspensions: Bridge Work",
    shortDescription: "Temporary suspensions are in place for Green and Pink Line service near the river bridge.",
    fullDescription: "Bridge maintenance work is causing temporary suspensions on both the Green and Pink Lines. Riders may need to transfer or use nearby bus service for affected stations.",
    severity: "major",
    isPlanned: true,
    impactedServices: [
      { serviceType: "L", lineColor: "Green", routeName: "Green Line", routeId: "Green" },
      { serviceType: "L", lineColor: "Pink", routeName: "Pink Line", routeId: "Pink" }
    ],
    eventStart: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    eventEnd: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "112",
    headline: "Orange and Purple Line Express Service: Signal Maintenance",
    shortDescription: "Express service is being reduced while signal maintenance continues near the Loop.",
    fullDescription: "Orange and Purple Line riders should expect reduced express service and additional dwell times while signal maintenance crews work near the Loop. Delays may be noticeable during the afternoon rush.",
    severity: "major",
    isPlanned: true,
    impactedServices: [
      { serviceType: "L", lineColor: "Orange", routeName: "Orange Line", routeId: "Orange" },
      { serviceType: "L", lineColor: "Purple", routeName: "Purple Line", routeId: "Purple" }
    ],
    eventStart: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    eventEnd: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "113",
    headline: "Loop Platform Restrictions: Brown and Orange Line Crowd Management",
    shortDescription: "Crowd management measures are limiting boarding at several Loop stations.",
    fullDescription: "Passengers using Brown and Orange Line services in the Loop may experience crowd management restrictions at major stations. Boarding may be temporarily limited to keep platforms safe and moving.",
    severity: "minor",
    isPlanned: false,
    impactedServices: [
      { serviceType: "L", lineColor: "Brown", routeName: "Brown Line", routeId: "Brown" },
      { serviceType: "L", lineColor: "Orange", routeName: "Orange Line", routeId: "Orange" }
    ],
    eventStart: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    eventEnd: null
  },
  {
    id: "114",
    headline: "Route 151 Sheridan Detour: Lake Shore Drive Closure",
    shortDescription: "Northbound 151 Sheridan buses are detoured around a temporary Lake Shore Drive closure.",
    fullDescription: "Route 151 Sheridan buses are using a temporary detour while Lake Shore Drive remains closed for emergency infrastructure work. Riders should allow extra travel time near the lakefront.",
    severity: "minor",
    isPlanned: true,
    impactedServices: [
      { serviceType: "Bus", routeName: "151 Sheridan", routeId: "151" }
    ],
    eventStart: new Date(Date.now() - 75 * 60 * 1000).toISOString(),
    eventEnd: new Date(Date.now() + 10 * 60 * 60 * 1000).toISOString()
  }
];