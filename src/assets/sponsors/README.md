# Sponsor logos

The team got these files from https://bulldogsracing.com/sponsorship on September 22, 2026.
The source page names these organizations and donors as supporters of BR25.

To change the page, edit `src/sponsorData.ts`:

- To add a sponsor: put the logo file in this folder. Import the file in `src/sponsorData.ts`. Add one object to `currentSponsors`. Give the object a unique `id`, a `name`, a `logo`, and a `url`.
- To remove a sponsor: remove its object from `currentSponsors`.
- To reorder the grid: reorder the objects in `currentSponsors`.
- To update the acknowledgments: edit `individualSupporters` and `previousSponsors`.
- To update the season or the packet: edit `sponsorSeason` and `sponsorshipPacket`.

The page shows each logo on a white background. The page keeps each logo's original proportions.

## Files

All 15 files are PNG files. Each file is 500×500 pixels. The code uses all 15 files. `src/sponsorData.ts` imports each file one time and links it to one entry in `currentSponsors`. `src/SponsorshipPage.tsx` shows these entries. No file in this folder is unused.

| File | Sponsor | Import name in `sponsorData.ts` |
|---|---|---|
| `bild.png` | Bild | `bild` |
| `gene-haas-foundation.png` | Gene Haas Foundation | `geneHaas` |
| `go-time.png` | GO TIME | `goTime` |
| `hoosier.png` | Hoosier Racing Tire | `hoosier` |
| `new-haven-powersports.png` | New Haven Powersports | `newHavenPowersports` |
| `online-metals.png` | OnlineMetals | `onlineMetals` |
| `red-bull.png` | Red Bull | `redBull` |
| `rigol.png` | RIGOL | `rigol` |
| `solidworks.png` | SOLIDWORKS | `solidworks` |
| `southern-blood-services.png` | Southern Blood Services | `southernBloodServices` |
| `tesla.png` | Tesla | `tesla` |
| `yale-city.png` | Tsai Center for Innovative Thinking at Yale | `yaleCity` |
| `yale-engineering.png` | Yale School of Engineering & Applied Science | `yaleEngineering` |
| `yceds.png` | Yale Undergraduate Chemical Engineering Design Society | `yceds` |
| `ysea.png` | Yale Science and Engineering Association | `ysea` |

`individualSupporters` and `previousSponsors` in `sponsorData.ts` are lists of names only. These two lists have no logo files.
