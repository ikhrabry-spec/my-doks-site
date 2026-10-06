---
title: "Search in Unlimited Network"
subtitle: ""
layout: "docs-page"
weight: 10
lead: "Secure Voting Platform"
---

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Peer-to-peer networks possess unique resilience and independence from centralized infrastructure. However, as the network grows to billions of devices, existing architectures inevitably degrade: search time increases, the volume of routing memory on each node grows, and network maintenance traffic becomes unmanageable. This is not an engineering problem — it is a limitation of the mathematical model.

## The Challenge

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;All known peer-to-peer network architectures — including DHT based on the Kademlia algorithm — suffer from avalanche-like growth in search complexity and routing memory volume as they scale. A network of one billion devices requires each node to store thousands of routing records and spend significant resources maintaining them. As the network grows to tens of billions of devices, existing approaches become practically unworkable. A global peer-to-peer network covering all of humanity was mathematically unattainable.

## The Solution

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An architecture has been developed in which deterministic search time does not depend on network scale. Calculations for a network of 100 billion nodes show: search time under 1 second (under 0.5 seconds for low-orbit satellite communications), routing information volume per device in the global network under 80 KB (with 100-fold and 1000-fold replication of address information), maintenance traffic for the global network under 100 bytes per second. These metrics are constant — they do not degrade as the network grows. The architecture supports unlimited scale, including one trillion nodes and beyond.

<center><strong>Details under NDA.</strong></center>
