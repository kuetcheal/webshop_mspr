import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { resolvePublicUrl } from "@/api/produitApi";
import { createClient } from "@/api/clientApi";
import { createOrder, createOrderProduct } from "@/api/commandeApi";

// MUI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

export default function Checkout() {
    const { items, total, clear } = useCart();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");   // dans ta table client
    const [company, setCompany] = useState("");
    const [city, setCity] = useState("");
    const [postal, setPostal] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const isDisabled = useMemo(() => {
        return loading || !firstName || !lastName || !username || !city || !postal || items.length === 0;
    }, [loading, firstName, lastName, username, city, postal, items]);

    useEffect(() => {
        if (items.length === 0) {
            // si panier vide, inutile d'être ici
            // navigate("/Products");
        }
    }, [items.length, navigate]);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            // 1) Créer (ou récupérer) le client
            const client = await createClient({
                username,
                firstName,
                lastName,
                city,
                postalCode: Number(postal),
                companyName: company || null,
                profile: "client web",
            });


            // 2) Créer la commande
            const order = await createOrder({ customerId: client.id });

            // 3) Créer les lignes
            await Promise.all(
                items.map(it =>
                    createOrderProduct({
                        orderId: order.id,
                        productId: it.id,
                        quantity: it.qty,
                        unitPriceSnapshot: it.price, // on fige le prix
                    })
                )
            );

            // 4) Nettoyage + redirection
            clear();
            navigate(`/order-confirmation/${order.id}`);
        } catch (err) {
            console.error(err);
            setError(err.message || "Une erreur est survenue");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
                Finaliser la commande
            </Typography>

            <Grid container spacing={3}>
                {/* Colonne gauche : Formulaire client */}
                <Grid item xs={12} md={7}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Informations de contact & adresse
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Prénom"
                                        fullWidth
                                        value={firstName}
                                        onChange={e => setFirstName(e.target.value)}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Nom"
                                        fullWidth
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Nom d'utilisateur (ou email)"
                                        helperText="Servira d'identifiant client"
                                        fullWidth
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Entreprise (optionnel)"
                                        fullWidth
                                        value={company}
                                        onChange={e => setCompany(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Ville"
                                        fullWidth
                                        value={city}
                                        onChange={e => setCity(e.target.value)}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Code postal"
                                        fullWidth
                                        value={postal}
                                        onChange={e => setPostal(e.target.value)}
                                        required
                                    />
                                </Grid>
                            </Grid>

                            {error && (
                                <Typography color="error" sx={{ mt: 2 }}>
                                    {error}
                                </Typography>
                            )}

                            <Divider sx={{ my: 3 }} />

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={isDisabled}
                                fullWidth
                            >
                                Confirmer et passer la commande
                            </Button>
                        </Box>
                    </Paper>
                </Grid>

                {/* Colonne droite : Récapitulatif */}
                <Grid item xs={12} md={5}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Récapitulatif
                        </Typography>

                        {items.map(it => {
                            const src = resolvePublicUrl(it.imageUrl);
                            return (
                                <Box key={it.id} sx={{ display: "flex", gap: 2, mb: 2 }}>
                                    <img
                                        src={src}
                                        alt={it.name}
                                        style={{ width: 72, height: 72, objectFit: "cover", borderRadius: 8 }}
                                    />
                                    <Box sx={{ flex: 1 }}>
                                        <Typography sx={{ fontWeight: 600 }}>{it.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {it.qty} × {it.price.toFixed(2)} €
                                        </Typography>
                                    </Box>
                                    <Typography sx={{ fontWeight: 600 }}>
                                        {(it.qty * it.price).toFixed(2)} €
                                    </Typography>
                                </Box>
                            );
                        })}

                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                            <Typography>Total</Typography>
                            <Typography sx={{ fontWeight: 700 }}>{total.toFixed(2)} €</Typography>
                        </Box>

                        {/* Pas de taxes, pas de modes d’expédition */}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
