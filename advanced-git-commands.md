# Advanced Git Commands Guide

This guide covers essential advanced Git commands that help you manage your workflow more effectively.

## Table of Contents
1. [git stash](#git-stash)
2. [git cherry-pick](#git-cherry-pick)
3. [git revert](#git-revert)
4. [git reset](#git-reset)

---

## 1. git stash

**Purpose**: Temporarily save uncommitted changes so you can work on something else and come back to them later.

### Basic Usage

```bash
# Save current changes to stash
git stash

# Save changes with a descriptive message
git stash save "WIP: working on feature X"

# List all stashes
git stash list

# Apply the most recent stash (keeps it in stash list)
git stash apply

# Apply and remove from stash list
git stash pop

# Apply a specific stash
git stash apply stash@{2}

# Drop (delete) a specific stash
git stash drop stash@{1}

# Clear all stashes
git stash clear

# Show changes in a stash
git stash show stash@{0}

# Show detailed diff of a stash
git stash show -p stash@{0}
```

### Practical Example

```bash
# You're working on a feature branch
$ git status
On branch feature-login
Changes not staged for commit:
  modified:   src/login.js
  modified:   src/auth.js

# Need to switch branches urgently but don't want to commit yet
$ git stash save "WIP: login form validation"
Saved working directory and index state On feature-login: WIP: login form validation

# Now working directory is clean
$ git status
On branch feature-login
nothing to commit, working tree clean

# Switch to another branch
$ git checkout hotfix-security

# After fixing the issue, return to feature branch
$ git checkout feature-login

# Restore your stashed changes
$ git stash pop
On branch feature-login
Changes not staged for commit:
  modified:   src/login.js
  modified:   src/auth.js
Dropped refs/stash@{0} (a1b2c3d)
```

### Advanced Stash Options

```bash
# Stash only tracked files (leave untracked files alone)
git stash --keep-index

# Include untracked files in stash
git stash -u

# Include untracked files and ignored files
git stash -a

# Create a new branch from stash
git stash branch new-branch-name stash@{0}
```

---

## 2. git cherry-pick

**Purpose**: Apply specific commits from one branch to another without merging entire branches.

### Basic Usage

```bash
# Cherry-pick a single commit
git cherry-pick <commit-hash>

# Cherry-pick multiple commits (in order)
git cherry-pick <commit1> <commit2> <commit3>

# Cherry-pick a range of commits (from commit1 to commit2, inclusive)
git cherry-pick <commit1>^..<commit2>

# Apply without automatically committing (allows editing)
git cherry-pick -n <commit-hash>

# Edit the commit message during cherry-pick
git cherry-pick -e <commit-hash>

# Abort a cherry-pick in progress
git cherry-pick --abort

# Continue after resolving conflicts
git cherry-pick --continue
```

### Practical Example

```bash
# View commit history on main branch
$ git log --oneline main
a1b2c3d Fix critical security bug
e4f5g6h Add user authentication
i7j8k9l Initial commit

# You're on a feature branch and need only the security fix
$ git checkout feature-dashboard
$ git cherry-pick a1b2c3d

# Output might show:
[feature-dashboard 2x3y4z5] Fix critical security bug
 Date: Mon Jan 15 10:30:00 2024 +0000
 1 file changed, 5 insertions(+), 2 deletions(-)

# If there are conflicts:
$ git cherry-pick a1b2c3d
error: could not apply a1b2c3d... Fix critical security bug
hint: After resolving the conflicts, mark them with
hint: "git add/rm <pathspec>", then run
hint: "git cherry-pick --continue".

# Resolve conflicts in your editor, then:
$ git add src/security.js
$ git cherry-pick --continue
```

### Use Cases

- **Hotfixes**: Apply a bug fix from `main` to a release branch
- **Selective features**: Bring specific features to another branch without full merge
- **Undo mistakes**: Copy commits that were accidentally made on wrong branch

### Important Notes

⚠️ **Cherry-picking creates new commits** with different hashes, even if the content is identical.

⚠️ **Can cause duplicate commits** if the same change is later merged through normal branch merging.

---

## 3. git revert

**Purpose**: Create a new commit that reverses the changes from a previous commit (safe for shared branches).

### Basic Usage

```bash
# Revert a single commit
git revert <commit-hash>

# Revert without automatically committing (allows editing before commit)
git revert -n <commit-hash>

# Revert multiple commits
git revert <commit1> <commit2>

# Revert a range of commits
git revert <commit1>^..<commit2>

# Edit commit message during revert
git revert -e <commit-hash>

# Use existing commit message without editing
git revert --no-edit <commit-hash>
```

### Practical Example

```bash
# View commit history
$ git log --oneline
a1b2c3d Add experimental feature (HEAD)
e4f5g6h Update documentation
i7j8k9l Fix login bug
m0n1o2p Initial commit

# The experimental feature caused issues, revert it
$ git revert a1b2c3d

# Git opens editor for commit message (default: "Revert 'Add experimental feature'")
# Save and close to complete

# Result:
$ git log --oneline
r5s6t7u Revert "Add experimental feature" (HEAD)
a1b2c3d Add experimental feature
e4f5g6h Update documentation
i7j8k9l Fix login bug

# To verify what was reverted:
$ git show r5s6t7u
```

### Handling Merge Commits

```bash
# Revert a merge commit (need to specify which parent to keep)
git revert -m 1 <merge-commit-hash>

# -m 1 means keep the first parent (usually the branch you merged into)
# -m 2 means keep the second parent (the merged branch)
```

### Practical Scenario

```bash
# Team scenario: Bad commit pushed to shared branch
$ git log --oneline origin/main
x9y8z7w Break production deployment  (BAD COMMIT)
a1b2c3d Previous stable version

# Safe way to undo (preserves history):
$ git revert x9y8z7w
$ git push origin main

# This creates a new commit that undoes the bad one
# History remains intact for other team members
```

### git revert vs git reset

| Aspect | git revert | git reset |
|--------|-----------|-----------|
| History | Preserves history | Rewrites history |
| Safe for shared branches | ✅ Yes | ❌ No |
| Creates new commit | ✅ Yes | ❌ No (usually) |
| Use case | Public/shared branches | Local/private branches |

---

## 4. git reset

**Purpose**: Move the current branch pointer to a different commit and optionally modify the staging area or working directory.

### Three Modes of git reset

```bash
# --soft: Move branch pointer, keep changes staged
git reset --soft <commit>

# --mixed (default): Move branch pointer, unstage changes (keep in working dir)
git reset --mixed <commit>
git reset <commit>  # same as --mixed

# --hard: Move branch pointer, discard all changes
git reset --hard <commit>
```

### Visual Explanation

```
Before reset:
A --- B --- C --- D (HEAD -> main)
                ↑
          Want to go here

After git reset --soft B:
A --- B --- C --- D (main)
      ↑
    (HEAD)
    Changes from C&D are STAGED

After git reset --mixed B:
A --- B --- C --- D (main)
      ↑
    (HEAD)
    Changes from C&D are UNSTAGED (in working directory)

After git reset --hard B:
A --- B --- C --- D (main)
      ↑
    (HEAD)
    Changes from C&D are DISCARDED permanently
```

### Basic Usage Examples

```bash
# Unstage all changes (keep modifications in working directory)
git reset HEAD

# Unstage a specific file
git reset HEAD <file>

# Go back one commit, keep changes staged
git reset --soft HEAD~1

# Go back one commit, unstage changes
git reset HEAD~1

# Go back one commit, discard all changes (DANGEROUS)
git reset --hard HEAD~1

# Reset to a specific commit
git reset --hard a1b2c3d

# Reset to upstream branch
git reset --hard origin/main
```

### Practical Examples

#### Example 1: Unstage Accidentally Committed Files

```bash
# You committed files you didn't mean to
$ git commit -m "Add config and source files"

# Realize you included sensitive config files
$ git reset --soft HEAD~1

# Now changes are staged, remove the config files from staging
$ git reset HEAD config/secret.json

# Add only the source files
$ git add src/

# Commit again with correct files
$ git commit -m "Add source files"
```

#### Example 2: Discard Local Changes

```bash
# You made changes but want to start fresh
$ git status
On branch main
Changes not staged for commit:
  modified:   src/app.js
  modified:   src/utils.js

# Discard ALL local changes (be careful!)
$ git reset --hard HEAD

# Working directory now matches last commit
$ git status
On branch main
nothing to commit, working tree clean
```

#### Example 3: Reorganize Commits

```bash
# Current history:
$ git log --oneline
f1g2h3i Third feature
d4e5f6g Second feature
a1b2c3d First feature

# Realize you want to redo the last two commits
$ git reset --soft a1b2c3d

# Now all changes from the three commits are staged
$ git status
Changes to be committed:
  modified:   file1.js
  modified:   file2.js
  modified:   file3.js

# Make additional changes, then commit differently
$ git add file1.js
$ git commit -m "Refactored first feature"

$ git add file2.js file3.js
$ git commit -m "Combined second and third features"
```

### Common Reset Patterns

```bash
# Undo last commit, keep changes staged
git reset --soft HEAD~1

# Undo last commit, keep changes unstaged
git reset HEAD~1

# Undo last 3 commits, keep changes staged
git reset --soft HEAD~3

# Completely discard last commit and all changes
git reset --hard HEAD~1

# Reset current branch to match remote (discards local commits)
git reset --hard origin/main

# Unstage a specific file
git reset -- <filename>

# Unstage all files
git reset
```

### ⚠️ Warning About git reset --hard

```bash
# THIS WILL PERMANENTLY DELETE UNSAVED CHANGES
git reset --hard <commit>

# Always double-check before running --hard
git status
git diff

# If you accidentally use --hard, you might recover using reflog:
git reflog
git reset --hard HEAD@{1}  # Go back to previous position
```

### Using git reflog to Recover from Reset

```bash
# View reference log (history of HEAD movements)
$ git reflog
a1b2c3d HEAD@{0}: reset: moving to HEAD~1
e4f5g6h HEAD@{1}: commit: Important feature
i7j8k9l HEAD@{2}: checkout: moving from feature to main

# Accidentally reset too far? Recover using reflog:
$ git reset --hard HEAD@{1}
```

---

## Quick Reference Chart

| Command | Best For | Safe for Shared Branches | Modifies History |
|---------|----------|-------------------------|------------------|
| `git stash` | Temporarily saving work | ✅ Yes | ❌ No |
| `git cherry-pick` | Applying specific commits | ⚠️ Careful | ❌ No (creates new commits) |
| `git revert` | Undoing commits publicly | ✅ Yes | ❌ No (adds new commit) |
| `git reset --soft` | Reorganizing commits locally | ❌ No | ✅ Yes |
| `git reset --mixed` | Unstaging changes | ⚠️ Local only | ✅ Yes |
| `git reset --hard` | Discarding changes completely | ❌ No | ✅ Yes |

---

## Best Practices

### When to Use Each Command

1. **Use `git stash`** when:
   - You need to quickly switch contexts
   - Your work isn't ready to commit
   - You want to test something quickly

2. **Use `git cherry-pick`** when:
   - You need specific commits on another branch
   - Applying hotfixes to release branches
   - You don't want to merge entire branches

3. **Use `git revert`** when:
   - Working on shared/public branches
   - You need to undo a commit safely
   - History preservation is important

4. **Use `git reset`** when:
   - Working on local/private branches
   - You need to reorganize commits before pushing
   - You want to unstage or discard local changes

### Golden Rules

✅ **Never use `git reset --hard` on shared branches**

✅ **Always use `git revert` for public history**

✅ **Use `git reflog` as a safety net**

✅ **Test cherry-picks on a backup branch first**

✅ **Create stashes with meaningful messages**

---

## Additional Tips

### Combine Commands for Power Workflows

```bash
# Stash, pull updates, then restore
git stash
git pull origin main
git stash pop

# Cherry-pick then edit the commit
git cherry-pick -n <commit>
# Make additional changes
git commit --amend

# Reset then selectively re-add files
git reset HEAD~1
git add <specific-files>
git commit -m "Better organized commit"
```

### Useful Aliases

Add these to your `~/.gitconfig`:

```ini
[alias]
    unstage = reset --
    uncommit = reset --soft HEAD~1
    undo = reset --hard HEAD~1
    stash-save = stash save
    stash-list = stash list
    stash-pop = stash pop
    pick = cherry-pick
```

Then use them like:
```bash
git unstage file.txt
git uncommit
git pick abc123
```

---

## Conclusion

Mastering these advanced Git commands gives you precise control over your version history:

- **`git stash`**: Your temporary parking lot for changes
- **`git cherry-pick`**: Surgical tool for selective commit application
- **`git revert`**: Safe undo button for shared history
- **`git reset`**: Powerful time machine for local history manipulation

Remember: With great power comes great responsibility. Always understand the implications before using these commands, especially on shared branches!
