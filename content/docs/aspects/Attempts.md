---
title: "Attempts"
subtitle: "Затраты на голосования"
subtitle: "Внутренние аспекты проекта"
layout: "docs-page"  # Специальный layout для разделов документации
weight: 3
---
All methods of improving the traditional secret voting process through computerization have turned out to be sources of a number of new problems inherent to these methods.

## Electronic Voting
### Scanners and DRE
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To eliminate errors in counting votes cast for various candidates at the polling station by members of the precinct election commission based on reviewing ballots, scanners were introduced. These scanners read ballots placed inside them by voters. Being connected in a local network, these scanners could generate a final protocol for an individual polling station, while leaving a paper trail—the ballots scanned. Subsequently, scanners were replaced by Direct Recording Electronic (DRE) machines, which could preserve a paper trail in the form of a printed receipt. This receipt could be given to the voter, creating preconditions for vote buying and voter coercion.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To prevent abuses during the transfer of protocols from precinct election commissions, scanners from individual polling stations were united into a local or overlay network.

### Remote Voting
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To eliminate the difficulties associated with the mandatory visit to a polling station, remote voting began to be used. In the first versions of its implementation, voters had to obtain a special device during registration that served as a voter identifier (in Estonia, such a device had to be purchased at a cost of a few dollars). Later, a method using the voter's mobile phone with a personally registered SIM card was proposed. Even later, voting from any smart device with internet access, via an application, was introduced.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Remote voting additionally removed the threats of distortion during the recording of vote counting results in protocols and the transmission of these protocols to the central election commission for summation.

## New Problems 
### Authentication (Registration and Access)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Remote voting brought the problem of user recognition during each system login. This is considering that the means providing authentication—devices, certificates, tokens, or passwords—can be transferred to another person or device.

### Verification of Participant Lists
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The electronic voter database immediately raised the question of its reliability. Verifying this database is impossible because its publication would lead to the disclosure of personal data of all registered voters. Maintaining a citizen database is the state's prerogative; the state is responsible for non-disclosure of this data. However, if the database management is entrusted to the state, it remains uncontrolled, creating a loophole for abuse by state officials and other power structures.

### Verification of Results
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Votes transmitted over secure electronic networks and results tallied on servers protected from external influence are hidden and fundamentally unverifiable. That is, there is no way to verify not only the voters' rights but also the number of voters who participated, the number of votes cast for each candidate, and, consequently, the correct distribution of votes among candidates. One can only trust that there are no back-doors in the system and that the election organizers are not malicious actors.

### Vote Verifiability and Vote Buying
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Satisfying an individual voter's desire to verify the voting results by finding their vote leads to nearly unsolvable contradictions. The possibility for a voter to see their vote immediately creates the potential for vote trading and makes voter coercion possible.

### Vulnerability of Smart Devices, Software, and Networks
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Remote voting relies on the flawless operation of technology. However, during its use, failures or malfunctions are possible. Deviations in the operation of software, computer devices, or communication networks are possible. Attempts to hack software and corrupt data are possible. Disconnections of smartphones and computers, network outages are possible. Loss of Data, Certificates, and Passwords.



