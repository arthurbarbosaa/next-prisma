"use client";

import { useSession } from "next-auth/react";
import { Card, CardBody, Button, Spinner } from "@nextui-org/react";
import Image from "next/image";
import { usePaymentStatus } from "@/hooks/usePaymentStatus";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session } = useSession();
  const { isLoading, hasPaid, error } = usePaymentStatus();
  const user = session?.user;

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Perfil do Usuário</h1>
        <p className="text-lg text-default-600">
          Gerencie suas informações pessoais
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardBody className="gap-8">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden">
                <Image
                  src={user?.image}
                  alt={user?.name || "Avatar"}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <p className="text-default-600">{user?.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Informações da Conta
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-default-600">ID</span>
                    <span>{user?.id}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-default-600">Tipo de Conta</span>
                    <span className="capitalize">{user?.role || "user"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-default-600">
                      Status da Assinatura
                    </span>
                    {isLoading ? (
                      <span>Carregando...</span>
                    ) : error ? (
                      <span className="text-danger">{error}</span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span
                          className={hasPaid ? "text-success" : "text-warning"}
                        >
                          {hasPaid ? "Premium" : "Gratuito"}
                        </span>
                        {!hasPaid && (
                          <Button
                            as={Link}
                            href="/pricing"
                            color="success"
                            size="sm"
                          >
                            Fazer Upgrade
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Segurança</h3>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-default-600">Autenticação</span>
                    <span>Google</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-default-600">Último Acesso</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
