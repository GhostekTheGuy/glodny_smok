import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  error: {
    key: string;
    message: string;
  } | null;
}

export function ErrorModal({ isOpen, onClose, error }: ErrorModalProps) {
  if (!error) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            Błąd zamówienia
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-gray-700">{error.message}</p>
        </div>
        <div className="flex justify-end">
          <Button onClick={onClose} variant="outline">
            Zamknij
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 