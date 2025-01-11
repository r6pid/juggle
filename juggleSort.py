import datetime

# Define an Assignment class
class Assignment:
    def __init__(self, name, importance, difficulty, due_date, total_time):
        self.name = name
        self.importance = importance
        self.difficulty = difficulty
        self.due_date = due_date
        self.total_time = total_time  # Total time required to complete the assignment (in minutes)
        self.time_completed = 0  # Time already spent on the assignment

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


# Check compatibility (if total remaining time of assignments can fit in the available time slots)
def checkCompatibility(time_slots, assignments):
    total_time_available = sum(ts.length for ts in time_slots)
    total_time_required = sum(a.remaining_time() for a in assignments)
    return total_time_required <= total_time_available


# Apply due dates (prioritize assignments with earlier due dates)
def applyDueDates(time_slots):
    for ts in time_slots:
        ts.possible_assignments.sort(key=lambda x: x.due_date)  # Sort by due date (earliest first)


# Filter difficulty (prefer harder assignments for longer time slots)
def filterDifficulty(time_slots):
    for ts in time_slots:
        if ts.length > 60:  # Longer slots, prefer harder assignments
            ts.possible_assignments.sort(key=lambda x: x.difficulty, reverse=True)
        else:  # Shorter slots, prefer easier assignments
            ts.possible_assignments.sort(key=lambda x: x.difficulty)


# Filter importance (prioritize high-importance assignments)
def filterImportance(time_slots):
    for ts in time_slots:
        ts.possible_assignments.sort(key=lambda x: x.importance, reverse=True)


# Create the optimal schedule with multiple assignments per time frame
def createSchedule(time_slots, assignments):
    if not checkCompatibility(time_slots, assignments):
        raise Exception("Not enough time slots for all assignments")
    
    # Prioritize assignments by due dates, difficulty, and importance
    applyDueDates(time_slots)
    filterDifficulty(time_slots)
    filterImportance(time_slots)

    schedule = []
    for ts in time_slots:
        remaining_time = ts.length
        allocations = []
        for assignment in ts.possible_assignments:
            if remaining_time <= 0:
                break
            if assignment.remaining_time() > 0:
                # Allocate time to the assignment
                time_to_spend = min(remaining_time, assignment.remaining_time())
                allocations.append((assignment.name, time_to_spend))
                assignment.time_completed += time_to_spend
                remaining_time -= time_to_spend

        if allocations:
            schedule.append({
                "time_slot": (ts.start_time, ts.end_time),
                "allocations": allocations,
            })
    
    return schedule


# Display the schedule grouped by time frame
def displaySchedule(schedule):
    print("Generated Schedule (Grouped by Time Frame):")
    for entry in schedule:
        start_time, end_time = entry["time_slot"]
        print(f"Time Frame: {start_time} to {end_time}")
        for allocation in entry["allocations"]:
            print(f"  Assignment: {allocation[0]}, Time Spent: {allocation[1]} minutes")
        print("-" * 40)


# Example usage:
# Create assignments with actual names and dates
assignments = [
    Assignment("Math Homework", 8, 5, datetime.datetime(2025, 1, 12, 18, 0), 120),
    Assignment("Science Project", 6, 7, datetime.datetime(2025, 1, 15, 9, 0), 180),
    Assignment("History Essay", 10, 3, datetime.datetime(2025, 1, 13, 20, 0), 90),
    Assignment("English Reading", 7, 4, datetime.datetime(2025, 1, 14, 10, 0), 60),
    Assignment("Computer Science Project", 9, 8, datetime.datetime(2025, 1, 16, 12, 0), 240),
    Assignment("Biology Lab Report", 8, 6, datetime.datetime(2025, 1, 17, 10, 0), 120),
    Assignment("Physics Homework", 7, 5, datetime.datetime(2025, 1, 18, 12, 0), 90),
    Assignment("Chemistry Project", 9, 7, datetime.datetime(2025, 1, 19, 10, 0), 180),
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

# Create and display the schedule
try:
    schedule = createSchedule(time_slots, assignments)
    displaySchedule(schedule)
except Exception as e:
    print(e)
