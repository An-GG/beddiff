# beddiff

USAGE:

```
./diff.js beds/bed_mesh_bare_aluminium.csv beds/bed_mesh_pei_hot.csv
```

- stdout is csv of diff
- creates viewer using template from plot/index.html, places it in ./plot/
- opens viewer using xdg-open

make mesh CSVs from printer.cfg file
```
cd beds
./util/klippercfg_to_beds.js ~/Downloads/printer.cfg
```
