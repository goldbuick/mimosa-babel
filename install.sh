#!/bin/bash

ORIG="$PWD"

npm install mimosa -g
cd ..
mkdir tmp_inst
cd tmp_inst
npm install mimosa-6to5
mv node_modules "$ORIG"
cd "$ORIG"