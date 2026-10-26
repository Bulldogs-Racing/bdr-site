# History photos

This folder has photos of past Bulldogs Racing cars from 2007 to 2020. This folder also has the header photo for the Team History page. The filenames come from the old WordPress site's media library. The `-edited` and `-768x619` parts of some filenames come from that same source. This codebase did not create these names.

The code imports each car photo two times. Two separate arrays use each photo. A person must keep these two arrays in sync by hand:
- `src/historyData.ts` (`previousCars`): this array shows the full car-by-car history on the History page (`src/HistoryPage.tsx`). Each entry has several paragraphs of text.
- `src/App.tsx` (`historySlides`): this array shows a short preview of the same cars on the home page. Each entry has its own `alt` text and a short list of `points`.

These two arrays do not share one data source. To add or edit a car, a person must update both files.

## Files

| File | Size (px) | Year | Used in |
|---|---|---|---|
| `2007.jpg` | 334×500 | 2007 | `historyData.ts` (`car2007`), `App.tsx` (`history2007`) |
| `2008-edited.jpg` | 580×326 | 2008 | `historyData.ts` (`car2008`), `App.tsx` (`history2008`) |
| `2010-edited.jpg` | 640×360 | 2010 | `historyData.ts` (`car2010`), `App.tsx` (`history2010`) |
| `2013.jpg` | 675×310 | 2013 | `historyData.ts` (`car2013`), `App.tsx` (`history2013`) |
| `2014-768x619.jpg` | 768×619 | 2014 | `historyData.ts` (`car2014`), `App.tsx` (`history2014`) |
| `2016.jpg` | 768×432 | 2016 | `historyData.ts` (`car2016`), `App.tsx` (`history2016`) |
| `2020.jpg` | 768×511 | 2020 | `historyData.ts` (`car2020`), `App.tsx` (`history2020`) |
| `team-history.jpg` | 2560×1700 | — | `HistoryPage.tsx` (`historyPhoto`) only |

`team-history.jpg` is the header photo at the top of the Team History page. This photo does not show one car year.

The code uses all eight files. No file in this folder is unused.

## Notes for future changes

- To add a car or an era: put the photo in this folder. Import the file in both `historyData.ts` and `App.tsx`. Add one entry to `previousCars`. Add one entry to `historySlides`.
- `historyData.ts` also has `historyChapters`. This array holds the narrative text for each era, for example "2006–2008" and "2010–2013". This array has no linked images.
- Some filenames show crops or edits from the old site, for example `2008-edited.jpg` and `2014-768x619.jpg`. A person does not need to rename these files to match a naming pattern.
