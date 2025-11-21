import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { useCallback, useMemo } from "react";
import { AUTHORIZATION_STATES } from "../../configs/constants";
import { authorizeEvidence } from "../../services/evidenceService";
import { useAuthorizationStore } from "../../stores/useAuthorizationStore";
import type { EvidenceResponse } from "../../types/EvidenceResponse";
import { DetailsCard } from "../card/DetailsCard";
import { TraceabilityCard } from "../card/TraceabilityCard";
import CommentsForm from "../form/CommentsForm";
import { Icon } from "../icons/Icon";

interface EvidenceMenuProps {
  readonly data: EvidenceResponse;
}

export function EvidenceMenu({ data }: EvidenceMenuProps) {
  const { toggleOpen, setRequest, setComponent } = useAuthorizationStore();

  const handleTraceability = useCallback(() => {
    toggleOpen();
    setRequest(data);
    setComponent(<TraceabilityCard />);
  }, [toggleOpen, setRequest, setComponent, data]);

  const handleDetails = useCallback(() => {
    toggleOpen();
    setRequest(data);
    setComponent(<DetailsCard />);
  }, [toggleOpen, setRequest, setComponent, data]);

  const handleAction = useCallback(
    (statusKey: keyof typeof AUTHORIZATION_STATES) => {
      function submitFn(comments: string) {
        return authorizeEvidence({
          id: data.id,
          documentStatusId: AUTHORIZATION_STATES[statusKey],
          state: true,
          comments,
        });
      }
      toggleOpen();
      setRequest(data);
      // eslint-disable-next-line react/jsx-no-bind
      setComponent(<CommentsForm submitFn={submitFn} />);
    },
    [data, setComponent, setRequest, toggleOpen],
  );

  const handlers = useMemo(
    () => ({
      handleAuthorize: () => handleAction("authorized"),
      handleDecline: () => handleAction("rejected"),
    }),
    [handleAction],
  );

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly color="primary" size="sm" variant="light">
          <Icon name="bi bi-three-dots-vertical" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Action event">
        <DropdownItem
          key="traceability"
          className="text-warning hover:text-white"
          color="warning"
          startContent={<Icon name="bi bi-clock-history" />}
          onClick={handleTraceability}
        >
          Ver trazabilidad
        </DropdownItem>
        <DropdownItem
          key="details"
          className="text-info hover:text-white"
          color="primary"
          startContent={<Icon name="bi bi-eye" />}
          onClick={handleDetails}
        >
          Ver detalles
        </DropdownItem>
        {data.documentStatusId === 1 ? (
          <>
            <DropdownItem
              key="approve"
              className="text-success hover:text-white"
              color="success"
              startContent={<Icon name="bi bi-check2-circle" />}
              onClick={handlers.handleAuthorize}
            >
              Aprobar
            </DropdownItem>
            <DropdownItem
              key="reject"
              className="text-danger hover:text-white"
              color="danger"
              startContent={<Icon name="bi bi-x-circle" />}
              onClick={handlers.handleDecline}
            >
              Rechazar
            </DropdownItem>
          </>
        ) : null}
      </DropdownMenu>
    </Dropdown>
  );
}
