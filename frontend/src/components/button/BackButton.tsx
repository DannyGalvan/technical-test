import { Button } from "@heroui/button";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { Icon } from "../icons/Icon";

export function BackButton() {
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Button
      isIconOnly
      className=" text-white font-bold"
      color="danger"
      onPress={handleBack}
    >
      <Icon name="bi bi-skip-backward-fill" />
    </Button>
  );
}
