# Philips-monitor SmartControl CLI

Simple utility that allows to create CLI shortcuts for monitor's settings

i.g. Fast switch between sRGB and 6500K modes via desktop links or devices like _Stream Deck_ or _Razer Tartarus_

## Tested on next devices

-   Philips 27" 27M1F5500P/00 (by my own)

## Requirements

Official software required to be installed and started in background on your PC.

[Download here](https://www.philips.co.uk/c-p/27M1F5500P_00/evnia-gaming-monitor-quad-hd-gaming-monitor/support)

## Installing

1. Clone repo in any desired folder.
2. Run `npm install --omit=dev` inside this folder.
3. Use one of profiles. Or create your own one. (default, fps, srgb is created already)
4. Check `smartcontrol` directory for possible variables in profile/CLI
5. Run `node . profile <profilename>` (i.e `node . profile fps`) inside of directory

## Functions

-   Set brighness
-   Set color temperature
-   Set smart image mode
-   Profile support (_WIP_)

## Contribution

Feel free to create pull requests and improve functionality  
Also always specify your monitor's model
