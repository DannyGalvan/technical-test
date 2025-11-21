import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";

import { useCallback } from "react";
import { useNavigate } from "react-router";
import type { RolResponse } from "../../types/RolResponse";
import { Icon } from "../icons/Icon";

interface RolButtonProps {
  readonly data: RolResponse;
}

export function RolButton({ data }: RolButtonProps) {
  const navigate = useNavigate();

  const handleEdit = useCallback(() => {
    navigate(`/roles/edit/${data.id}`);
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
