import datetime

# Define an Assignment class
class Assignment:
    def __init__(self, name, importance, difficulty, due_date):
        self.name = name
        self.importance = importance
        self.difficulty = difficulty
        self.due_date = due_date
        self.total_time = self.calculate_total_time()  # Dynamically calculate total time
        self.time_completed = 0  # Time already spent on the assignment

    def calculate_total_time(self):
        # Base time is 30 minutes, scaled by importance and difficulty
        base_time = 30
        importance_weight = 10  # Time added per unit of importance
        difficulty_weight = 8   # Time added per unit of difficulty
        return base_time + (self.importance * importance_weight) + (self.difficulty * difficulty_weight)

    def remaining_time(self):
        return self.total_time - self.time_completed


# Define a TimeSlot class
class TimeSlot:
    def __init__(self, start_time, end_time):
        self.start_time = start_time
        self.end_time = end_time
        self.length = (end_time - start_time).seconds // 60  # Length in minutes
        self.possible_assignments = []

    def set_possible_assignments(self, assignments):
        self.possible_assignments = assignments


# Sort assignments globally to avoid redundant sorting
def sort_assignments(assignments):
    return sorted(
        assignments,
        key=lambda x: (x.due_date, -x.importance, -x.difficulty),
    )


# Create the optimal schedule with multiple assignments per time frame, including breaks and splitting assignments
def createSchedule(time_slots, assignments):
    # Sort assignments globally
    sorted_assignments = sort_assignments(assignments)

    # Initialize schedule
    schedule = []

    for ts in time_slots:
        remaining_time = ts.length
        allocations = []
        for assignment in sorted_assignments:
            if remaining_time <= 0:
                break
            if assignment.remaining_time() > 0:
                # Calculate time to spend, reserving breaks
                time_to_spend = assignment.remaining_time()
                if allocations:
                    # Reserve 5 minutes for a break if another assignment was already allocated
                    if remaining_time < time_to_spend + 5:
                        time_to_spend = max(0, remaining_time - 5)

                # Limit time to the remaining time in the slot
                time_to_spend = min(time_to_spend, remaining_time)

                # Allocate time
                if time_to_spend > 0:
                    allocations.append((assignment.name, time_to_spend))
                    assignment.time_completed += time_to_spend
                    remaining_time -= time_to_spend

                # Deduct 5 minutes for a break if another allocation is possible
                if remaining_time >= 5 and assignment.remaining_time() > 0:
                    remaining_time -= 5

        # Add time slot with allocations to the schedule
        if allocations:
            schedule.append({
                "time_slot": (ts.start_time, ts.end_time),
                "allocations": allocations,
            })

    return schedule


# Display the schedule grouped by time frame with breaks
def displaySchedule(schedule):
    print("Generated Schedule (Grouped by Time Frame, Including Breaks):")
    for entry in schedule:
        start_time, end_time = entry["time_slot"]
        print(f"Time Frame: {start_time} to {end_time}")
        for i, allocation in enumerate(entry["allocations"]):
            print(f"  Assignment: {allocation[0]}, Time Spent: {allocation[1]} minutes")
            if i < len(entry["allocations"]) - 1:
                print("  Break: 5 minutes")
        print("-" * 40)


# Example usage:
# Create assignments with actual names and dates
assignments = [
    Assignment("Math Homework", 8, 5, datetime.datetime(2025, 1, 12, 18, 0)),
    Assignment("Science Project", 6, 7, datetime.datetime(2025, 1, 15, 9, 0)),
    Assignment("History Essay", 10, 3, datetime.datetime(2025, 1, 13, 20, 0)),
    Assignment("English Reading", 7, 4, datetime.datetime(2025, 1, 14, 10, 0)),
    Assignment("Computer Science Project", 9, 8, datetime.datetime(2025, 1, 16, 12, 0)),
    Assignment("Biology Lab Report", 8, 6, datetime.datetime(2025, 1, 17, 10, 0)),
    Assignment("Physics Homework", 7, 5, datetime.datetime(2025, 1, 18, 12, 0)),
    Assignment("Chemistry Project", 9, 7, datetime.datetime(2025, 1, 19, 10, 0)),
]

# Create time slots with actual names and dates
time_slots = [
    TimeSlot(datetime.datetime(2025, 1, 12, 14, 0), datetime.datetime(2025, 1, 12, 16, 0)),
    TimeSlot(datetime.datetime(2025, 1, 12, 16, 0), datetime.datetime(2025, 1, 12, 18, 0)),
    TimeSlot(datetime.datetime(2025, 1, 13, 10, 0), datetime.datetime(2025, 1, 13, 12, 0)),
    TimeSlot(datetime.datetime(2025, 1, 13, 14, 0), datetime.datetime(2025, 1, 13, 16, 0)),
    TimeSlot(datetime.datetime(2025, 1, 14, 9, 0), datetime.datetime(2025, 1, 14, 11, 0)),
    TimeSlot(datetime.datetime(2025, 1, 14, 13, 0), datetime.datetime(2025, 1, 14, 15, 0)),
    TimeSlot(datetime.datetime(2025, 1, 15, 10, 0), datetime.datetime(2025, 1, 15, 12, 0)),
    TimeSlot(datetime.datetime(2025, 1, 15, 14, 0), datetime.datetime(2025, 1, 15, 16, 0)),
    TimeSlot(datetime.datetime(2025, 1, 16, 9, 0), datetime.datetime(2025, 1, 16, 12, 0)),
    TimeSlot(datetime.datetime(2025, 1, 17, 10, 0), datetime.datetime(2025, 1, 17, 12, 0)),
    TimeSlot(datetime.datetime(2025, 1, 18, 12, 0), datetime.datetime(2025, 1, 18, 14, 0)),
    TimeSlot(datetime.datetime(2025, 1, 19, 10, 0), datetime.datetime(2025, 1, 19, 12, 0)),
]

# Set possible assignments for each time slot
for ts in time_slots:
    ts.set_possible_assignments(assignments)

# Create and display the schedule with breaks
try:
    schedule = createSchedule(time_slots, assignments)
    displaySchedule(schedule)
except Exception as e:
    print(e)
