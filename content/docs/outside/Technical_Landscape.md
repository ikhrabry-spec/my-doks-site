---
title: "Technical Landscape"
subtitle: "Политический ландшафт"
layout: "docs-page"  # Специальный layout для разделов документации
weight: 4
---
The growth in the number of internet users and the functional capabilities of personal computing devices, which will reliably ensure the operation of our online voting system that requires every voter to have a device equipped with a front-facing camera and for all these devices to be interconnected.

## Internet and Smartphone Proliferation 
### Number of Internet Userss 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; This requirement is already met in many countries. In the Netherlands, Saudi Arabia, Norway, and the United Arab Emirates, internet penetration is nearly 100 percent {{< source-ref "1">}}. In the United States, 324 million people use the internet; in Indonesia, the figure is 230 million {{< source-ref "2">}}. Notably, 93.7% of users access the internet via smartphones {{< source-ref "3">}}.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; The growth in internet users has accelerated in recent years due to active government initiatives. For instance, largely thanks to the government's "Digital India" initiative, India's digital population reached 751 million active users in 2024,   and by October 2025, it reached 1.03 billion users in India {{< source-ref "4">}}. The overall trend suggests that the overwhelming majority of the Earth's inhabitants will be covered by the internet in the coming years.

### Number of Personal Computing Device Owners 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; The number of smartphone owners worldwide in 2025 is 5.28 billion people and is growing year by year {{< source-ref "5">}}.   Forecasts indicate that the number of people without personal internet-access devices will continue to decrease year by year, eventually approaching zero {{< source-ref "6">}}. The decreasing cost of smartphones facilitates this trend. For example, by the end of 2025, a smartphone can be purchased in India for less than $90 USD (e.g., the Moto G05 can be purchased for $63 USD (₹5,699) in early January 2026 {{< source-ref "7">}}. In Indonesia, smartphones are available for less than $70 USD {{< source-ref "8">}}.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; It is important to note that some people prefer tablets to smartphones, and internet access is also possible from laptops and personal computers.

## Technical Potential
### Personal Devices 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  High-performance smartphones equipped with high-quality selfie cameras have already become widely available, including in the budget price segment. This trend is well illustrated by market realities in Southeast Asia. For example, the Motorola Moto G05 4G with 4 GB of RAM, 64 GB of storage, and a 50-megapixel camera is sold in India for approximately 7,429 rupees (around 85–90 US dollars). An even more affordable example is the Itel A90 (3–4 GB RAM / 64 GB storage), which is priced in Indonesia at about 1,035,000 rupiah (approximately 69 US dollars). These devices clearly demonstrate that the entry threshold for owning a smartphone with modern features has fallen to the 70–90 US dollar range, making the technology accessible even in regions with relatively low income levels. {{< source-ref "9">}}.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; This affordability is likely to increase further due to two main factors. First, intense competition among manufacturers in the budget and ultra-budget segments forces them to continuously improve baseline specifications—such as increasing RAM capacity or camera resolution—in order to attract consumers. Second, there is a natural cost reduction and diffusion of components: technologies that were used only in mid-range models two or three years ago (for example, high-resolution camera sensors) are now becoming standard in the most affordable devices of the new generation. As a result, the current price level of 70–90 US dollars for a functional smartphone should not be seen as a limit, but rather as another step in the ongoing process of technological democratization.

### Peer-to-Peer Networks 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; The implementation of our online voting system relies on the unconditional access of any voter's smartphone to the peer-to-peer network formed for the current vote, regardless of the voter's location. An overlay network over the internet can optimally serve as such a peer-to-peer network. Widespread access to the internet based on D2D/NTN (Device-to-Device/Non-Terrestrial Network) technologies for transmitting text messages will become available in the coming years {{< source-ref "10">}}, and for full-fledged video message transmission within the next five years (from the site's creation) {{< source-ref "11">}}.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Thus, the technological trend aligns with our architecture, transforming every smartphone, every personal computing device connected to the internet, into an independent node of a secure voting system.


