#!/usr/bin/env bash

test_project_dir=$1
if [[ "$test_project_dir" = "" ]]; then
 echo "Usage: $0 <test-project-dir>"
 echo "  This script will firstly forcefully delete that directory, then create it fresh and generate into it"
 exit 1
fi

read -r -p "This will recursively delete the specified folder and start clean: ${test_project_dir}. Are you sure? [y/N] " response
if [[ "$response" =~ ^([yY])$ ]]; then
  echo "Generating into ${test_project_dir}"
else
  echo "Okey dokey ... exiting"
  exit 1
fi

rm -rf ${test_project_dir}
mkdir -p ${test_project_dir}
cd ${test_project_dir}
yo @mondomob/gae-node-nestjs
echo
echo "Initialising a git repo with an initial commit to help make tracking changes easier"
git init
git add .
git commit -m "Initial commit"
echo "Generation complete and initial code committed to local git repo"
echo "Project dir: ${test_project_dir}"
