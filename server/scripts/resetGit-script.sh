


if ! grep -qxF "**/.env" .gitignore; then #check for the .env in gitignore first so if not **/.env found in gitignore then
    echo "Adding .env to .gitignore"
    echo "**/.env" >> .gitignore     #adding all .envs to gitignore here

else
    echo "git already ignores .env"  #message confirming it exists 
fi


#Looking for .env files tha remain if exist we remove from git tracking

if git ls-files --error-unmatch .env > /dev/null 2>&1; then #look if git is tracking .env files if it is error with 1 and start removing,  '> /dev/null 2>&1;' keeps output cleaner
    echo "Removing .env from Git tracking..."
    git rm --cached .env

else 
    echo ".env is not tracked. Skipping removal." #otherwise just message confirming it does not track
fi

#promt to create a new git repo and remove old one
read -p "Do you want to reset the Git repo and create a new one? (y/n): " confirm
if [[ "$confirm" == "y" ]]; then
    echo "Removing old Git repo..."
    rm -rf .git
    git init
    git add .
    git commit -m "Initial commit with .env handling"
    echo "Git repo reinitialized."
else
    echo "Skipping Git reinitialization."
fi

echo "done"

#.env made it to last commit this is supposed to be a reusable script if situation appears again.