# tiaportal-pdf-comparator
Tool for comparison of 2 pdf, that was produced from TIA Portal software

# How to use
Requirements: node v.4.6.0 

* First install all dependencies:
```npm install```

* then put old and new pdf with the names "old.pdf" and "new.pdf" correspondently to project dir

* start process ```node main.js```

* see result in "diff.json"

Note: we already have two pdf files in repo for example

# Workflow explanation
all the intermediate json files are stored in 'temp/' folder

1. first we parse each pdf (117 pages for example) to raw.json (approximately 2,6 millions lines if we will prettify it - you can see content with 'sublime text' editor for example) - using 'pdf2jsonParser' module
2. raw.json we transform to res.json - using 'mapJson' module (the whole complicated magic going on here)
3. finding diffs between two res.json's and put them to "diff.json" - using 'diffMaker' module

result will have next structure:
```
{
    removed: { ... }, // list of removed lines
    updated: { ... }, // list of changed lines and what was changed
    added: { ... } // list of added lines
};
```

### Step 2 limitations
we parse table from pdf, first of all.
So I clearly indicate the ranges of each column x coordinate.
The title of each column is also clearly stated in the code.
Look 'lib/mapJson.js' for more information. 
