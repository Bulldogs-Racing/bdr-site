# Sponsor logos

Downloaded from https://bulldogsracing.com/sponsorship on September 22, 2026.
The source identifies these organizations and donors as supporters of BR25.

Titan Circuits was added at the team's request on November 3, 2026. Its official logo was downloaded from https://pcbassembly.com/images/logo.png. The white wordmark is rendered in black with CSS for contrast on the sponsor cards.

To update the page, edit `src/sponsorData.ts`:

- Add a logo here, import it in the data file, and add an object to `currentSponsors` with a unique `id`, `name`, `logo`, and `url`.
- Remove a sponsor by removing its object. The grid automatically sorts sponsors alphabetically by name.
- Edit `individualSupporters` and `previousSponsors` to maintain the acknowledgments.
- Update `sponsorSeason` and `sponsorshipPacket` when the season or packet changes.

Logos are displayed on white with their original proportions preserved.
