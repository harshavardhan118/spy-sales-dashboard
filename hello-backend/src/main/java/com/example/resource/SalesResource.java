package com.example.resource;

import com.example.entity.Sale;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/sales")
@Produces(MediaType.APPLICATION_JSON)
public class SalesResource {

    @GET
    public List<Sale> getAll() {
        return Sale.listAll();
    }

@POST
@Consumes(MediaType.APPLICATION_JSON)
@jakarta.transaction.Transactional
public Response create(Sale sale) {
    sale.persist();
    return Response.ok(sale).build();
}

}
