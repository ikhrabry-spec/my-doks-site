---
title: "Patented ideas"
subtitle: "Альтернативные разработки"
layout: "docs-page"  # Специальный layout для разделов документации
weight: 2
---
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A review of inventions in the field of electronic voting reveals a multitude of partial solutions. Each is aimed at solving specific problems while ignoring the fundamental systemic trade-offs inherent in the architecture of all known online voting systems.

## Authentication
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Methods for granting access to the voting process only to individuals who were previously registered (i.e., entered into a database), while excluding the possibility of their substitution.

### Access via Document and Database Verification
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The natural method of voter authentication is the traditional verification of presented identity documents. This method is reflected in a number of patents presenting various combinations of identifying features with data from identity documents or information in databases.{{< patent-ref "1">}}{{< patent-ref "2">}}{{< patent-ref "3">}}{{< patent-ref "4">}}{{< patent-ref "5">}}{{< patent-ref "6">}}{{< patent-ref "7">}}{{< patent-ref "8">}}

### Authentication Using Tokens or Certificates
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A significant place among user authentication concepts is occupied by the concept of providing the user with a hidden token or certificate, reflecting their individual characteristics and generated automatically by a method impervious to external influence. User authentication is performed by matching their individual characteristics, available during authentication, with the characteristics in their token or certificate, simultaneously verifying the presence of the token or certificate in the system's database. {{< patent-ref "9">}}{{< patent-ref "10">}}{{< patent-ref "11">}}{{< patent-ref "12">}}

### Methods to Prevent Spoofing (Liveness Detection)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Many inventors have focused on authentication  that excludes the substitution of one person by another or by a bot. Such authentication must establish that the presented image is that of a living person.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Features for this can include the correspondence of images of a live person in visible and infrared spectra, the consistency of lighting in a 3D image with observed light sources, etc. Inventions proposing methods for using these features have emerged. {{< patent-ref "13">}}{{< patent-ref "14">}}{{< patent-ref "15">}}

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Another feature can be a meaningful behavioral reaction of a person to presented commands or performing actions corresponding to created test conditions. Many methods relying on these features were devised. {{< patent-ref "16">}}{{< patent-ref "17">}}{{< patent-ref "18">}}{{< patent-ref "19">}}{{< patent-ref "20">}} The use of unconscious physiological reactions to external stimuli, such as changes in the color or brightness of observed images, proved promising. The reaction to external stimuli at the moment of authentication was the basis for numerous methods of conducting it. {{< patent-ref "21">}}{{< patent-ref "22">}}{{< patent-ref "23">}}{{< patent-ref "24">}}{{< patent-ref "25">}}{{< patent-ref "26">}}{{< patent-ref "27">}}{{< patent-ref "28">}}

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Eyes, as inseparable from a person, are convenient to observe for changes under external influences. The properties and reactions of the eye's cornea hold a special place among identifying features, and their use has become the subject of several inventions. {{< patent-ref "29">}}{{< patent-ref "30">}}{{< patent-ref "31">}}{{< patent-ref "32">}} However, inventors have paid no less attention to methods based on observing gaze movement. {{< patent-ref "33">}}{{< patent-ref "34">}}{{< patent-ref "35">}}

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The invention of a complex method aggregating simpler ones became a natural progression. {{< patent-ref "36">}}

### General Remark on Authentication Problems
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Issues related to threats of result manipulation by the authentication organizers have remained outside the inventors' field of vision. This task was peripheral to their attention because authentication is primarily conducted in the interests of its organizers. Only in elections does a situation arise where the authentication organizers might be interested in its imitation as a facade of legitimacy behind which there is no actual authentication.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Resolving this fundamental problem is the subject of our own patent application US20240244049A1 “Cross-authentication with the use of selfie video”.

## Voter Registration
### Composition and Protection of Stored Voter Personal Data
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Credentials that could be used by the system to establish a voter's identity without an election commission representative include selfies, passport data, registration or residential address information, biometric data, geolocation information, tokens, certificates, unique device identifiers, etc. The very act of inputting this data into the system immediately creates the problem of its potential leakage. In traditional voting, identity verification is performed by a commission member comparing the voter's identity against a single presented document; a special registration as a voter is not required. In contrast, a special voter registration requires the disclosure of the entire spectrum of personal data needed for subsequent authentication to the person conducting the registration. Another problem becomes the preservation of this data in secret and its use without disclosure.{{< patent-ref "37">}}{{< patent-ref "38">}}{{< patent-ref "39">}}

### Registration Based on Previous Registrations
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An alternative to the comprehensive use of diverse personal features, which inevitably intrudes into the voter's private sphere, became the concept of relying on a set of pre-existing registrations. Thus, the idea embedded in online registration procedures emerged: comparing a live image of the voter, obtained during registration, with the image in an official document presented during registration and with data in other structures deemed reliable. {{< patent-ref "40">}}{{< patent-ref "41">}}{{< patent-ref "42">}}{{< patent-ref "43">}}{{< patent-ref "44">}}

### Voter List Verification
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;There are no patents aimed at overcoming, or even detecting, malicious actions by voter registration organizers to falsify voter lists. Although inventions that could be used for this exist—for instance, the accounting of real estate objects serving as a basis for linking a person to a territory where they have the right to vote.{{< patent-ref "44">}}

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A solution to the fundamental problem of voter list verification is presented in our own patent application US20240403987A1 “System and method for creating, maintaining and verifying voter lists”.

## Vote Casting
### Computerization of Traditional Voting
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Initially, the use of computers in all voting-related information processing and storage processes was patented. {{< patent-ref "45">}}

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Later, the use of devices accepting machine-readable ballots was patented, then devices for paperless voter input, and then the networking of these devices—first locally, later with the use of the internet .

### Online Voting Systems 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Initially, it was assumed that voting would occur in designated places on special devices, and the inventors' task was to devise a method for granting access to users entitled to vote while preserving ballot secrecy. Electronic communication was needed only to transmit results to the central election commission.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The next step was patents on using any personal computing device—be it a personal computer, laptop, tablet, or smartphone—to transmit the vote directly to the central election commission via a website or application. This led to new patents for means of confirming a voter's right to participate in a specific vote while preserving secrecy, and for vote counting devices with subsequent undistorted publication. {{< patent-ref "46">}}{{< patent-ref "47">}}{{< patent-ref "48">}}{{< patent-ref "49">}}{{< patent-ref "50">}}{{< patent-ref "51">}}{{< patent-ref "52">}}{{< patent-ref "54">}}{{< patent-ref "55">}}{{< patent-ref "56">}}{{< patent-ref "57">}}{{< patent-ref "58">}}

### Online Voting Systems Using Blockchain
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To achieve the same goals, various methods using blockchain were patented, as it seemed an ideal means.{{< patent-ref "59">}}{{< patent-ref "60">}}{{< patent-ref "61">}}{{< patent-ref "62">}}{{< patent-ref "63">}}{{< patent-ref "64">}}{{< patent-ref "65">}}{{< patent-ref "66">}}{{< patent-ref "67">}}{{< patent-ref "68">}}{{< patent-ref "69">}} 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;However, all patents for using blockchain in secret voting implement a scheme with, on one side, the unverifiable organizers and trusted parties, and on the other, the verifiable voters and unpredictable external malicious actors. Furthermore, all this inventions, to varying degrees, the simple methods of violation inherent in traditional voting: breaches of secrecy, vote buying, voter coercion, and ballot stuffing, initiated by dishonest organizers and administrators controlling the servers. The emphasis is on the reliable storage of voter information and cast votes. Some of these inventions even lack guarantees of anonymity, and many lack mechanisms for verifying the correct tally of cast votes.

### Online Voting Systems in a Peer-to-Peer Network 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To eliminate the possibility of influencing the vote via a privileged server, patents were filed for systems and methods of voting in a strictly peer-to-peer network using a distributed ledger without blockchain. However, the systems and methods proposed in these patents either do not prevent ballot stuffing or, while countering stuffing, fail to exclude vote buying and coercion. {{< patent-ref "70">}}{{< patent-ref "71">}}{{< patent-ref "72">}}

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Methods allowing a voter to verify the correct recording of their choice in the results became the subject of several patents. But it turned out that while enabling verification, they all facilitate vote buying and coercion. {{< patent-ref "73">}}{{< patent-ref "74">}}{{< patent-ref "75">}}

### General Remark on the Problems of the Voting Process 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;It is characteristic that in all inventions, paths are visible through which malicious actors can easily hinder the achievement of the stated goals—for example, by controlling the server (enabling uncontrolled ballot stuffing or even substitution) or by controlling registration and access (enabling manipulation of the voter list). But even in the absence of a server, when stuffing and substitution are excluded, an insurmountable contradiction remains between the need to ensure: a) ballot secrecy, b) the ability to verify result accuracy, and c) countering vote buying and coercion.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Resolving this triangle of fundamental contradictions is the subject of our own patent application US20250182552A1 “A system and method of secret online voting countering vote stuffing and substitution, vote trading and pressure on voters”.



