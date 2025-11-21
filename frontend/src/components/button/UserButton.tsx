import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";

import { useCallback } from "react";
import { useNavigate } from "react-router";
import type { UserResponse } from "../../types/UserResponse";
import { Icon } from "../icons/Icon";

interface UserButtonProps {
  readonly data: UserResponse;
}

export function UserButton({ data }: UserButtonProps) {
  const navigate = useNavigate();

  const handleEdit = useCallback(() => {
    navigate(`/users/update/${data.id}`);
  }, [navigate, data.id]);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly color="primary" size="sm" variant="light">
          <Icon name="bi bi-three-dots-vertical" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Action event">
        <DropdownItem
          key="viewDetails"
          className="text-warning hover:text-white"
          color="warning"
          startContent={<Icon name="bi bi-eye" />}
          onClick={handleEdit}
        >
          Editar
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
