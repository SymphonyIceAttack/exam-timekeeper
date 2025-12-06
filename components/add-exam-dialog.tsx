"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { LanguageType } from "@/lib/translation";
import { t } from "@/lib/translation";

interface AddExamDialogProps {
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
  onAddExamAction: (exam: {
    name: string;
    date: Date;
    favorite: boolean;
    color: string;
  }) => void;
}

export function AddExamDialog({
  open,
  onOpenChangeAction,
  onAddExamAction,
}: AddExamDialogProps) {
  const params = useParams();
  const lang = params.lang as LanguageType;
  const [name, setName] = useState("");
  const [date, setDate] = useState<Date>();
  const [selectedColor, setSelectedColor] = useState("rose");

  const colors = [
    { name: "rose", class: "bg-rose-400" },
    { name: "cyan", class: "bg-cyan-400" },
    { name: "orange", class: "bg-orange-400" },
    { name: "purple", class: "bg-purple-400" },
    { name: "green", class: "bg-green-400" },
    { name: "blue", class: "bg-blue-400" },
  ];

  const handleSubmit = () => {
    if (name && date) {
      onAddExamAction({
        name,
        date: date,
        favorite: false,
        color: selectedColor,
      });
      setName("");
      setDate(undefined);
      setSelectedColor("rose");
      onOpenChangeAction(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t("dialog.addCustomExam.title", lang)}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="exam-name">
              {t("dialog.examName.label", lang)}
            </Label>
            <Input
              id="exam-name"
              placeholder={t("dialog.examName.placeholder", lang)}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label>{t("dialog.examDate.label", lang)}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-white"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? (
                    format(date, "PPP")
                  ) : (
                    <span className="text-zinc-400">
                      {t("dialog.selectDate", lang)}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 bg-zinc-900 border-zinc-800"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  autoFocus
                  className="bg-zinc-900 text-white"
                  classNames={{
                    months: "space-y-4",
                    month: "space-y-4",
                    caption:
                      "flex justify-center pt-1 relative items-center text-white",
                    caption_label: "text-sm font-medium",
                    nav: "space-x-1 flex items-center",
                    nav_button:
                      "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-white",
                    nav_button_previous: "absolute left-1",
                    nav_button_next: "absolute right-1",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex",
                    head_cell:
                      "text-zinc-400 rounded-md w-9 font-normal text-[0.8rem]",
                    row: "flex w-full mt-2",
                    cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-zinc-800/50 [&:has([aria-selected])]:bg-zinc-800 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                    day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-zinc-800 rounded-md text-white",
                    day_range_end: "day-range-end",
                    day_selected:
                      "bg-zinc-700 text-white hover:bg-zinc-700 hover:text-white focus:bg-zinc-700 focus:text-white",
                    day_today: "bg-zinc-800 text-white",
                    day_outside:
                      "day-outside text-zinc-600 opacity-50 aria-selected:bg-zinc-800/50 aria-selected:text-zinc-600 aria-selected:opacity-30",
                    day_disabled: "text-zinc-600 opacity-50",
                    day_hidden: "invisible",
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label>{t("dialog.colorTheme.label", lang)}</Label>
            <div className="flex gap-3">
              {colors.map((color) => (
                <button
                  type="button"
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-10 h-10 rounded-full ${color.class} ${
                    selectedColor === color.name
                      ? "ring-2 ring-white ring-offset-2 ring-offset-zinc-900"
                      : ""
                  }`}
                  aria-label={`Select ${color.name} color`}
                />
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChangeAction(false)}
            className="bg-zinc-800 hover:bg-zinc-700"
          >
            {t("dialog.cancel", lang)}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!name || !date}
            className="bg-white text-black hover:bg-zinc-200"
          >
            {t("dialog.addExam", lang)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
