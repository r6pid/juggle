import React, { useState } from 'react';
import { DatePicker } from "@nextui-org/react";
import { now, getLocalTimeZone } from "@internationalized/date";
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  inert?: boolean; // Add inert as an optional boolean prop
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, inert = false }) => {
  const [assignmentName, setAssignmentName] = useState('');
  const [dueDate, setDueDate] = useState(now(getLocalTimeZone()));
  const [importance, setImportance] = useState(5);
  const [difficulty, setDifficulty] = useState(5);

  const handleSubmit = () => {
    console.log({
      assignmentName,
      dueDate,
      importance,
      difficulty,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button className="hidden">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" inert={inert}>
        <DialogHeader>
          <DialogTitle>Add New Assignment</DialogTitle>
        </DialogHeader>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Assignment Name</label>
          <input
            type="text"
            value={assignmentName}
            onChange={(e) => setAssignmentName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter assignment name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Due Date</label>
          <DatePicker
            hideTimeZone
            showMonthAndYearPickers
            defaultValue={dueDate}
            onChange={setDueDate}
            label="Due Date"
            variant="bordered"
            inert={false} // Explicitly set inert to false
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Importance (1-10)</label>
          <input
            type="range"
            min="1"
            max="10"
            value={importance}
            onChange={(e) => setImportance(Number(e.target.value))}
            className="w-full"
          />
          <span className="text-sm">{importance}</span>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Difficulty (1-10)</label>
          <input
            type="range"
            min="1"
            max="10"
            value={difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))}
            className="w-full"
          />
          <span className="text-sm">{difficulty}</span>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} className="w-full">
            Add Assignment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;