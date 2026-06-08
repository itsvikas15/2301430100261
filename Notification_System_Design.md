# Stage 1

## Priority Logic

Placement > Result > Event

Weights:

- Placement = 3
- Result = 2
- Event = 1

## Sorting

Notifications are first sorted by priority weight.

If two notifications have the same priority,
the most recent notification is ranked higher.

## Top 10 Strategy

After sorting, only the first 10 notifications are returned.

## Scalability

For large-scale systems a Min Heap of size 10
can be used to maintain the top notifications
efficiently.