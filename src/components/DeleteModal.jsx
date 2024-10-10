import { Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import PropTypes from 'prop-types';

export const DeleteModal = ({isDisabled, onDelete}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-2 text-[#FC5757] hover:text-white bg-white shrink-0 rounded-full">
          <Trash2 className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Signature</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this signature. This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={isDisabled} type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>

          <Button
            disabled={isDisabled}
            type="button"
            variant="destructive"
            onClick={onDelete}
          >
            delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

DeleteModal.propTypes = {
  isDisabled: PropTypes.bool,
  onDelete: PropTypes.func
}
