---
title: "Political Landscape"
subtitle: "Политический ландшафт"
layout: "docs-page"  
weight: 3
---
The proliferation of electronic voting systems worldwide in the early 21st century. The situation concerning the protection of state interests through internet restrictions. The legislative framework underlying the use of secret online voting systems. Nuances of personal data protection within these systems. An analysis of global experience in implementing e-voting and the legal frameworks regulating it. The contradiction between two trends: growing legislative interest in online voting and the simultaneous tightening of data protection and cybersecurity regulations, which render many existing architectures unacceptable.

## Practice of Using Electronic Voting Systems 
### Online Voting Systems 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; According to the International Institute for Democracy and Electoral Assistance (International IDEA), as of February 6, 2023, 34 out of 178 countries in its database use electronic voting at the national and/or sub-national level. In 15% of countries, feasibility studies or tests for potential future use of e-voting in elections are or have been conducted. However, it should be noted that in 11 countries (6%), e-voting has been discontinued, with concerns about trust and security being a primary reason.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 17 of the 34 countries using e-voting do so via Direct-Recording Electronic (DRE) machines, either with or without a Voter-Verifiable Paper Audit Trail (VVPAT). Countries using DRE with VVPAT include Albania, Bulgaria, Fiji, India, Iran, Mexico, Oman, Panama, Peru, the Russian Federation, Venezuela, and some states in the USA. Countries using DRE without VVPAT include Bangladesh, Bhutan, Brazil, France, Namibia, and some states in the USA.{{< source-ref "1">}}

### Remote (Online) Voting 
&nbsp;&nbsp;&nbsp;&nbsp;Only 14 countries use internet voting systems, and in most cases, quite limitedly. 
* **Domestically for all voters:** Estonia and the United Arab Emirates.
* **Domestically for some voters:** Australia (only in New South Wales), Canada (only in local elections), Russia (in some regions), South Korea (only for certain institutions and organizations).
* **For voting from abroad:** Armenia, Ecuador, France, Mexico, New Zealand, Oman, Pakistan, Panama.
* **For military personnel:** Armenia.

### Restrictions on Internet and Smartphone Use 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A number of countries impose restrictions on internet and smartphone use, encoding requirements for citizens and providers in laws and regulations. Non-compliance can lead to administrative (fines) and criminal liability.

### Requirements for Citizens 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Such user requirements include: 
* mandatory SIM card registration with a passport, 
* linking accounts to a phone number or passport, 
* prohibition on using Tor, I2P, anonymizers, proxy servers, E2EE without a license/registration, anonymous publications, and unmarked messages failing to disclose the author's status (e.g., foreign agent), 
* content restrictions (creating or reposting).

### Requirements for Providers, Operators, or Platforms 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Requirements include: 
* storing traffic metadata for 6–24 months, 
* retaining IP logs and user activity history, 
* mandatory key disclosure to the state, 
* prohibition of access to state-blocked websites and technologies, 
* mandatory Deep Packet Inspection (DPI) for content analysis. The provider is obliged to: host servers within the country, provide monitoring interfaces, and possess state certifications.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The state assigns itself the right to throttle traffic, shut down mobile internet, restrict access to an approved ("whitelisted") set of resources (e.g., taxis, marketplaces, government services), and completely disconnect the national network from the global one (e.g., the Great Firewall of China).

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Countries implementing such restrictions to varying degrees include China, Iran, Turkmenistan, Russia, Oman, the UAE, Indonesia (partially), India, Iran, Qatar, and Turkey.

## Legal Regulation of Electronic Voting 
### Typology of Regulations 
&nbsp;&nbsp;&nbsp;&nbsp;The legal environment governing elections consists of laws passed by parliament, subordinate legislation enacted by the government or authorized agencies, and rulings by constitutional or other high courts interpreting these laws and regulations.

&nbsp;&nbsp;&nbsp;&nbsp;Legislative acts can be mandatory or advisory. They can strictly define the voting procedure and the technical environment used, or merely outline their framework. They may permit or prohibit pilot voting.

&nbsp;&nbsp;&nbsp;&nbsp;Some legal acts contain direct bans on e-voting, for example, prohibiting systems that do not allow for external verifiability, i.e., do not meet constitutional requirements for ballot secrecy and result verifiability.

&nbsp;&nbsp;&nbsp;&nbsp;Other acts permit online voting subject to a number of strict conditions (conditional permission), specified in regulations and requirements (identification, certification, paper trail/audit trail, public audits, localization, etc.). Related laws (indirect restrictions) also apply—cybersecurity laws, data protection laws (particularly for personal data), localization requirements, mandatory log retention, etc.

&nbsp;&nbsp;&nbsp;&nbsp;In many countries, legislation explicitly names the types of individuals eligible for online voting and the mechanisms for such voting (expatriates, military personnel abroad, ship crews, etc.).

### Precedents 
* **Germany:** The Federal Constitutional Court (BVerfG), in a ruling on March 3, 2009, declared that voting systems lacking external verifiability of results contradict the principles of free elections and the constitution. This resulted in a de facto ban on many classes of DRE and remote e-voting systems without a verifiable paper trail or cryptographically provable verification {{< legal-ref "1">}}.
* **Estonia:** Remote e-voting has been provided for since November 2012 under the General Electoral Law, implemented based on mandatory identification via the state e-ID (ID-card, Mobile-ID, Smart-ID) with audit procedures and the possibility to cancel an internet-cast vote at a polling station {{< legal-ref "2">}}.
* **France:** In France, electronic voting for citizens residing abroad is regulated by the French Electoral Code (Code électoral) and is applied in a limited manner: it is permitted only for parliamentary elections (elections to the National Assembly) and for consular elections, while for presidential elections, elections to the European Parliament, or referendums this possibility is not provided for by law. The practice of introducing and suspending online voting depends on decisions made by the authorities, taking into account cybersecurity assessments: the initial system, developed by the company Scytl, was used from 2012 and was temporarily cancelled in 2017 after failing security tests. Online voting resumed in 2022 on a new platform developed by the French company Voxaly. {{< legal-ref "3">}}{{< source-ref "2">}}.
* **Canada:** The Canada Elections Act (prior approval for alternative electronic voting in federal elections) allows testing of alternative mechanisms (including electronic ones) and requires approval from the House and Senate or special committees before widespread use in federal elections. In practice, municipal and territorial pilots have been conducted, but nationwide remote e-voting has not {{< legal-ref "4">}}.
* **China:** China does not regulate electronic voting through a dedicated electoral framework but imposes indirect constraints via the Cybersecurity Law. These include requirements for server localization, domestic data storage, log retention, and government access to information systems. Such provisions significantly restrict the feasibility of remote or distributed electronic voting platforms, particularly those relying on foreign infrastructure or decentralized architectures. {{< legal-ref "5">}}. 
* **EU:** European Commission reports on remote voting highlight regulatory constraints arising from data protection, cybersecurity, and electoral integrity requirements. While not establishing a unified EU-wide legal framework for remote voting, these documents demonstrate how GDPR and related policies indirectly shape national approaches, particularly with respect to voter identification, anonymity, auditability, and cross-border data processing. {{< source-ref "3">}}.
* **USA:** The Help America Vote Act (HAVA) of 2002 {{< legal-ref "6">}}, mandates the Election Assistance Commission (EAC) to develop and implement voting standards. Compliance is voluntary except in states where required by state law. In 2021, the EAC officially adopted the Voluntary Voting System Guidelines (VVSG 2.0), regulating accessibility and usability for election officials and voters, including people with disabilities. It includes audit methods supporting software independence to confirm voting accuracy and enhance voter trust {{< legal-ref "7">}}.

## Personal Data Laws 
### Legislative Diversity 
&nbsp;&nbsp;&nbsp;&nbsp;Personal data laws vary by country. Data is typically categorized into standard (e.g., names, addresses, passport data, email addresses, and network identifiers like IP addresses and cookie data) and sensitive data, which could be used for discrimination or harm (e.g., race, political opinions, health information, religious beliefs, biometric data, financial information, passwords).

&nbsp;&nbsp;&nbsp;&nbsp;Common legal principles have emerged across countries:

* **Lawfulness, fairness and transparency:** Data processing must have a legal basis and be carried out in a fair and user-transparent manner.
* **Purpose limitation:** Data may be collected only for specific, explicitly stated and legitimate purposes.
* **Data minimization:** Organizations should collect only data that is adequate, relevant and limited to what is necessary for the intended purpose.
* **Integrity and confidentiality:** Personal data must be protected against unauthorized or unlawful processing, as well as against accidental loss, destruction or damage.
* **Accountability:** Organizations that collect and store personal data are responsible for demonstrating compliance with data protection principles.
* **Data subject rights:** Individuals have rights (which may vary by jurisdiction) to access, rectify and erase their data, as well as to object to its processing.{{< source-ref "4">}}

&nbsp;&nbsp;&nbsp;&nbsp;Despite common principles, legislative diversity creates unequal data protection conditions. For instance, according to the National Conference of State Legislatures (NCSL) in the US, requirements for concealing personal data vary significantly by state. In 31 states, voter records, including names and addresses, are accessible and can be purchased, with purchasers being restricted to parties in some states and open to anyone in others. 20 states have some restrictions on disseminating personal data for certain voter groups. Meanwhile, in 44 states, a broad range of voters can request to hide their address {{< source-ref "5">}}.

&nbsp;&nbsp;&nbsp;&nbsp;Oversight is usually handled by a Data Protection Authority (DPA), with one DPA operating in each jurisdiction.

### Legislative Principles Regarding Image Publication 
&nbsp;&nbsp;&nbsp;&nbsp;It is permitted to publish images or biometric data if the publication lacks additional information allowing the linking of this image or data to a specific individual. Thus, publishing images of individuals in a crowd at a square, in a concert hall, or in an anonymized list without direct mapping to their standard personal data does not violate data protection law.

&nbsp;&nbsp;&nbsp;&nbsp;The following are prohibited: 
* processing, 
* using for recognition, or 
* direct identification—i.e., publicly linking a specific individual to a specific situation (e.g., in a queue to a doctor of a specific specialization or to a judge).

&nbsp;&nbsp;&nbsp;&nbsp;Examples of lawful publication include photo or video of a person in a public place where faces are random and unidentifiable, in an anonymized list where entries contain no data to reconstruct identity and there is no mapping database, and in scientific publications of anonymized DNA sequences unlinked to specific individuals.

&nbsp;&nbsp;&nbsp;&nbsp;Thus, the law restricts identification activities and the publication of their results, but not the publication of the identification source material (photos, videos, DNA), provided they are published without performing identification and without the possibility of unambiguous linkage to a specific person.

&nbsp;&nbsp;&nbsp;&nbsp;Therefore, existing legal trends—tightening regulation and prioritizing data minimization—are making traditional systems based on collecting full personal profiles increasingly vulnerable. Our architecture, which inherently does not require the storage of protectable personal data, not only meets this regulatory challenge but sets a new standard, turning a legal constraint into a technological advantage.



