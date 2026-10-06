---
title: "Consensus-Based Verification"
subtitle: ""
layout: docs-page
weight: 15
---
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In decentralized networks, each node stores a copy of part of the common information — routing tables and data. The integrity of this information is critical for the correct operation of the entire network. However, verifying the correctness of stored information has traditionally required either a central arbiter or resource-intensive blockchain protocols.

## The Challenge

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Replicated routing information in a peer-to-peer network can be corrupted — accidentally or intentionally. A node storing incorrect routing information disrupts search operations for the entire network. Yet in a fully decentralized system, there is no central authority capable of verifying the correctness of data on each node. Existing consensus mechanisms — such as blockchain — require significant computational resources and do not scale to billions of nodes.

## The Solution

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A protocol has been developed that enables each node to independently verify and restore the correctness of the routing information and data it stores — without a central arbiter, trusted nodes, or significant computational overhead. This is achieved through the architectural integration of nodes into the network, the multi-replication of the information they store, and the use of consensus.

<center><strong>Details under NDA.</strong></center>
