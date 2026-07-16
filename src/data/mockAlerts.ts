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
  }
];