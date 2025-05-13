import { Box, Container, Stack, Text, Flex, Link, useColorModeValue } from "@chakra-ui/react";

const Footer = () => {
    const bgColor = useColorModeValue("gray.50", "gray.900");
    const textColor = useColorModeValue("gray.700", "gray.200");

    return (
        <Box
            as="footer"
            bg={bgColor}
            color={textColor}
            py={10}
            mt="auto"
        >
            <Container maxW="container.xl">
                <Flex
                    direction={{ base: "column", md: "row" }}
                    justify="space-between"
                    align="center"
                >
                    <Text>© 2025 Universidad. Todos los derechos reservados.</Text>
                    <Stack direction="row" spacing={6} mt={{ base: 4, md: 0 }}>
                        <Link href="#">Términos</Link>
                        <Link href="#">Privacidad</Link>
                        <Link href="#">Contacto</Link>
                    </Stack>
                </Flex>
            </Container>
        </Box>
    );
};

export default Footer;