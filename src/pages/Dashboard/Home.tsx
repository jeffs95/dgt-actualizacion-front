import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import Table from "../../components/tables/Persona/Table";
import Email from "../../components/tables/PersonaEmail/Table";
import Telefono from "../../components/tables/PersonaTelefono/Table";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function Home() {
  return (
    <>
      <PageMeta
        title="DGT-ACTUALIZACION"
        description="Proyecto actualizacion front"
      />
      <PageBreadcrumb pageTitle="Direcciones" />
      <div className="space-y-6">
        <ComponentCard title={""}>
          <Table />
        </ComponentCard>
      </div>

      <PageBreadcrumb pageTitle="Direcciones Electronicas" />
      <div className="space-y-6">
        <ComponentCard title={""}>
          <Email />
        </ComponentCard>
      </div>

      <PageBreadcrumb pageTitle="Telefonos" />
      <div className="space-y-6">
        <ComponentCard title={""}>
          <Telefono />
        </ComponentCard>
      </div>

      <PageBreadcrumb pageTitle="Documentos" />
      <div className="space-y-6">
        <ComponentCard title={""} children={undefined}>
        </ComponentCard>
      </div>
    </>
  );
}
