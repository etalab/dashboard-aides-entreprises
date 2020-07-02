#!/bin/bash
for file in ../data/aides/aides-20*.csv 
do
    echo $file
    NAME=${file##*/}
    ./4c_update_db_aide.sh $NAME
done