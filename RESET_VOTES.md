# Reset Votes Instructions

## Option 1: Using Firebase Console (Easiest)

1. Go to: https://console.firebase.google.com/project/unit3quiz-v005-angus/firestore/data
2. Click on the "votes" collection
3. Select all documents (check the box at the top)
4. Click the delete button (trash icon)
5. Confirm deletion

## Option 2: Using Firebase CLI

```bash
# Delete all votes
firebase firestore:delete --all-collections --yes
```

**Note:** This deletes ALL collections. Only use if you want to start completely fresh.

## Option 3: Manual Script (Advanced)

The script `scripts/resetVotes.js` can be run, but requires Node.js ES modules setup.

## What Happens After Reset

- All existing votes will be deleted
- Users can vote again
- New votes will be about the alcohol sales policy (not drug overdose)
- Each user can still only vote once (enforced by Firestore rules)

---

**Recommended:** Use Option 1 (Firebase Console) - it's the easiest and safest method.

