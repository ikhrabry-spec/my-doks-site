---
title: "Requirements"
subtitle: "Внутренние аспекты проекта"
layout: "docs-page"  # Специальный layout для разделов документации
weight: 4
---
A list of reasons, as of the creation of this site (December 2025), that still prevent the widespread use of online voting in electoral processes, and the qualities that an online secret voting system must possess as a result.

## Analysis of Problems
### Differentiation of Problems
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The situation, where advancements in computer technology and the accompanying communication means have not found application in electoral secret voting procedures, has attracted the attention of scientists and become a subject of close study.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Naturally, the computerization introduced into the voting process, while solving several problems of traditional ballot voting, created many new problems for which solutions have not been found. Among them were problems related to the possibility of using means intended to improve the secret voting process for the purpose of distorting its results (i.e., rendering it meaningless), and problems inherent to any computerization.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Research showed that the main reason was the focus of developments on creating mechanisms that immanently ensure the fundamental properties of secret voting and are capable of technically resisting external attacks {{< publication-ref "1">}}{{< publication-ref "2">}}. At the same time, countering malicious actions by voting participants and utilizing non-technical tools remained on the periphery of these developments.

### A Key Reason for Non-Use
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A key result of foundational research {{< publication-ref "3">}} was the understanding that the insurmountable reason for the refusal to use electronic voting systems was the inability of all existing systems to fully withstand the full range of targeted hostile actions. The understanding that the reliability of an online voting system cannot be based solely on technical solutions ensuring vote secrecy, and error-free transmission and preservation of information. The foundation of its reliability must be its ability to withstand malicious actions by any interested parties: any public associations (including observers who may not be voters), candidates, voters, election commission officials, polling station workers, auditors (including foreign ones), system developers, service providers, etc. And most importantly, such resistance must utilize not only technical tools.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In this work, for each property that the proposed voting system must ensure, a list of questions was formulated. The answers to these questions allow for an assessment of whether the proposed system can be used in electoral secret voting—that is, whether the proposed online secret voting system is suitable for state use.

## Set of Unachieved Requirements
### Expanded Access
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The ability to legally vote from anywhere (including abroad), using any available device equipped with the necessary application.

### Verifiability of Lists Without Disclosing Personal Data
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The ability to verify the correct accounting of voters and the basis of their right to participate in the current vote, without disclosing personal data, considering that the list of such data varies across jurisdictions. 

### Impossibility of Voter Substitution
Eliminating the possibility of a voter transferring their credentials to other persons or having their right used secretly without their intention to use it.

### Resolving the Contradiction
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ensuring the voter's ability to verify the correct recording of their vote, while simultaneously eliminating their ability to show their vote to anyone and the ability to discredit the election in which they participated.

### Impossibility of List Manipulation
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Eliminating the possibility of making uncontrolled, unverifiable changes to the legally established lists of voters and received votes, as well as to the results of their counting.

### Inadmissibility of Ballot Stuffing
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Eliminating any possibility of introducing additional votes beyond those actually received or substituting votes cast by real voters.

### Countering Illegal Exclusion of a Candidate
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The possibility to anonymously add an eliminated candidate to the list of elected persons or to conduct an alternative vote on a list that includes them.

### Protection of Technology
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;It is necessary to anticipate all possible variants of malfunctions in the electronic equipment used for voting and ways to overcome associated problems—be it failures in software, computer devices, or communication networks. Furthermore, means must be provided to mitigate attempts to hack software, corrupt data, disconnect smartphones and computers, and counter malicious actions by users and external attackers.
