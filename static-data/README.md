### STATIC DATA FOLDERS

-----------
The files contained in this folder are those fetched by default from the ODAMAP production instance.

The main principle of ODAMAP is being data-free : ODAMAP's config files point to distant files or API to fetch the data consumed and displayed client-side... 

------------

#### Structure

```

.
+-- geodata (geojsons files)

|   +-- centers (of departements and regions)
|   +-- regions (100m)
|   +-- regions (1000m)
|   +-- departements (100m)
|   +-- departements (1000m)

+-- prod ( json datasets )

|   +-- aides (fonds de solidarité) + minified
|       +-- national
|       +-- régional
|       +-- départemental
|       +-- update text

|   +-- pge (prêts garantis par l'Etat) + minified
|       +-- national
|       +-- régional
|       +-- départemental
|       +-- update text

|   +-- report (report d'échéance/reports de charge) + minified
|       +-- national
|       +-- régional
|       +-- départemental
|       +-- update text

|   +-- taxonomies (référentiels de libellés et de couleurs) + minified
|       +-- régions
|       +-- departements
|       +-- classes effectifs
|       +-- nafs
|       +-- sections naf
|       +-- [ to do ] classes structures juridiques




```

----------
